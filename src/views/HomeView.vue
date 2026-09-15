<template>
  <div class="hero">
    <span class="hero-tag">Speed Performance Drive</span>
    <h1>Спортивные мотоциклы <span>для настоящих мужиков</span></h1>
    <p>Мощь, аэродинамика и адреналин. Выбери свой байк и ворвись в мир высокой скорости.</p>
  </div>

  <div class="moto-grid">
    <div v-for="moto in motos" :key="moto.title" class="moto-card">
      <span class="icon">{{ moto.icon }}</span>
      <h3>{{ moto.title }}</h3>
      <div class="spec">{{ moto.spec }}</div>
      <p>{{ moto.description }}</p>
      <span class="badge">{{ moto.badge }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
const motos = [
  {
    icon: 'YZF',
    title: 'YZF-R1',
    spec: '998 см³ • 200 л.с.',
    description: 'Кросс-плановая четвёрка с акустикой MotoGP. Максимальная скорость — 299 км/ч.',
    badge: 'Легенда',
  },
  {
    icon: 'V4',
    title: 'Panigale V4',
    spec: '1103 см³ • 214 л.с.',
    description: 'Итальянский характер, десмодромный V4 и аэродинамика от Ducati Corse.',
    badge: 'Италия',
  },
  {
    icon: 'HON',
    title: 'Fireblade SP',
    spec: '999 см³ • 215 л.с.',
    description: 'Honda с электронным управлением и полуактивной подвеской Öhlins.',
    badge: 'Точность',
  },
  {
    icon: 'H2',
    title: 'Ninja H2',
    spec: '998 см³ • 310 л.с.',
    description: 'Суперчарджер, который выдаёт невероятную тягу на любых оборотах.',
    badge: 'Турбо',
  },
]
</script>