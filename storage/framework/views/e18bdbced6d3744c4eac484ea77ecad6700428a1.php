<!doctype html>
<html lang="<?php echo e(str_replace('_', '-', app()->getLocale())); ?>">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title><?php echo e(config('app.name')); ?></title>

  <!-- Scripts -->
  
  <script src="<?php echo e(mix('js/app.js')); ?>" defer></script>

  <!-- Fonts -->
  <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Merriweather|Roboto:400">
  <link rel="stylesheet" href="https://unpkg.com/ionicons@4.2.2/dist/css/ionicons.min.css">

  <!-- Styles -->
  <link rel="stylesheet" href="https://hypertext-candy.s3-ap-northeast-1.amazonaws.com/posts/vue-laravel-tutorial/app.css">
</head>
<body>
  
  <div id="app"></div>
</body>
</html><?php /**PATH /Applications/MAMP/htdocs/laravel_test/resources/views/index.blade.php ENDPATH**/ ?>