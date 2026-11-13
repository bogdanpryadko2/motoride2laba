import argparse
import http.cookiejar
import json
import os
import uuid
from pathlib import Path
from urllib.request import HTTPCookieProcessor, Request, build_opener, urlopen


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument('--api', default='http://localhost:8080')
    parser.add_argument('--photos-dir', type=Path, required=True)
    parser.add_argument('--backup', type=Path, required=True)
    args = parser.parse_args()
    base = args.api.rstrip('/')
    opener = build_opener(HTTPCookieProcessor(http.cookiejar.CookieJar()))
    token = None

    def request(path, method='GET', data=None, content_type='application/json', anonymous=False):
        headers = {'Content-Type': content_type}
        if token and not anonymous:
            headers['Authorization'] = 'Bearer ' + token
        if path.startswith('/api/auth/') and method == 'POST':
            csrf = request('/api/auth/csrf', anonymous=True)
            headers[csrf['headerName']] = csrf['token']
        body = data if isinstance(data, bytes) else json.dumps(data).encode() if data is not None else None
        with opener.open(Request(base + path, data=body, headers=headers, method=method), timeout=60) as response:
            result = response.read()
            return json.loads(result) if result else None

    auth = request('/api/auth/login', 'POST', {
        'email': os.environ['MOTORIDE_ADMIN_EMAIL'],
        'password': os.environ['MOTORIDE_ADMIN_PASSWORD'],
    }, anonymous=True)
    token = auth['accessToken']
    try:
        photos = json.loads(Path(__file__).with_name('motorcycle-photos.json').read_text())
        catalog = []
        for page in range(100):
            batch = request(f'/api/motorcycles?page={page}&size=100')
            catalog.extend(batch)
            if len(batch) < 100:
                break
        originals = []
        for photo in photos:
            matches = [bike for bike in catalog if (bike['brand'], bike['model']) == (photo['brand'], photo['model'])]
            if len(matches) != 1:
                raise ValueError(f"Expected one motorcycle: {photo['brand']} {photo['model']}")
            bike = request('/api/motorcycles/' + str(matches[0]['id']))
            originals.append(bike)
        args.backup.parent.mkdir(parents=True, exist_ok=True)
        with args.backup.open('x') as backup:
            json.dump(originals, backup, ensure_ascii=False, indent=2)
        fields = ('brand', 'model', 'engineCc', 'horsepower', 'badge', 'shortDescription', 'description', 'imageUrl', 'price', 'categoryId', 'technologyIds')
        for index, bike in enumerate(originals, 1):
            path = args.photos_dir / f'{index}.jpg'
            if not path.exists():
                args.photos_dir.mkdir(parents=True, exist_ok=True)
                source = Request(photos[index - 1]['downloadUrl'], headers={'User-Agent': 'MotoRideLab6/1.0'})
                with urlopen(source, timeout=60) as response:
                    path.write_bytes(response.read(5 * 1024 * 1024 + 1))
            image = path.read_bytes()
            boundary = uuid.uuid4().hex
            multipart = (f'--{boundary}\r\nContent-Disposition: form-data; name="file"; filename="bike.jpg"\r\nContent-Type: image/jpeg\r\n\r\n'.encode()
                         + image + f'\r\n--{boundary}--\r\n'.encode())
            uploaded = request('/api/images', 'POST', multipart, 'multipart/form-data; boundary=' + boundary)
            body = {key: bike[key] for key in fields}
            body['imageUrl'] = uploaded['imageUrl']
            request('/api/motorcycles/' + str(bike['id']), 'PUT', body)
            with opener.open(base + uploaded['imageUrl'], timeout=30) as response:
                if response.status != 200 or not response.headers['Content-Type'].startswith('image/'):
                    raise ValueError('Uploaded image is not publicly readable')
            print(f"{bike['brand']} {bike['model']}: uploaded and verified", flush=True)
    finally:
        request('/api/auth/logout', 'POST', anonymous=True)


if __name__ == '__main__':
    main()
