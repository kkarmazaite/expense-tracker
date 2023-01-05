<template>
  <div class="flex h-screen w-screen">
    <div
      class="
        w-2/3
        hidden
        md:block
        bg-[url('~/assets/images/bg-image.jpg')] bg-no-repeat bg-cover
        h-full
      "
    ></div>

    <div class="w-full md:w-1/3 bg-white p-10">
      <UILogo class="text-right text-2xl" />
      <div class="h-full flex items-center">
        <slot />
      </div>
    </div>
  </div>
</template>
