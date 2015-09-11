<!DOCTYPE html>
<?php 
/* Short and sweet */
define('WP_USE_THEMES', false);
require('./wp-blog-header.php');
?>

    <html lang="en">
    <head>
    <title>Dental Implants I Colorado Springs Dentist I 80906</title>
    <meta charset="utf-8">
    <meta name = "format-detection" content = "telephone=no" />
    <link rel="icon" href="../../images/favicon.ico" type="image/x-icon">
    <link rel="shortcut icon" href="../../images/favicon.ico" type="image/x-icon" />
    <link rel="stylesheet" href="../../css/style.css">
    <link rel="stylesheet" href="../../css/superfish.css">

    <script src="../../js/jquery.js"></script>
    <script src="../../js/jquery-migrate-1.2.1.js"></script>
    <script src="../../js/jquery.easing.1.3.js"></script>
    <script src="../../js/script.js"></script>
    <script src="../../js/superfish.js"></script>
    <script src="../../js/jquery.mobilemenu.js"></script>
    
    <script src="../../js/jquery.equalheights.js"></script>
    <script src="../../js/jquery.ui.totop.js"></script>


    
    <!--[if lt IE 9]>
       <div style=' clear: both; text-align:center; position: relative;'>
         <a href="http://windows.microsoft.com/en-US/internet-explorer/products/ie/home?ocid=ie6_countdown_bannercode">
           <img src="http://storage.ie6countdown.com/assets/100/images/banners/warning_bar_0000_us.jpg" border="0" height="42" width="820" alt="You are using an outdated browser. For a faster, safer browsing experience, upgrade for free today." />
         </a>
      </div>
    <![endif]-->
    <!--[if lt IE 9]>
        <script src="../../js/html5shiv.js"></script>
        <link rel="stylesheet" type="text/css" media="screen" href="../../css/ie.css">
    <![endif]-->
    </head>
    <body>
<!--==============================header=================================-->
<header>
    <div class="h-top">
        <div class="container">
            <div class="row">
                <div class="grid_12">
                    <div class="inside clearfix">
                        <h1>
						<img src="../../images/WOM 2 logo.gif" alt=""></h1>
                        <nav>
                           <ul class="sf-menu">
                    			<li ><a href="../../index.html">Home</a> </li>
                                <li><a href="../../index-1.html">Services </a></li>
                                <li class="current"><a href="index-2-wp.php">News & Reviews</a></li>
                                <li><a href="../../index-4.html">Contact Us</a></li>
                            </ul>
                        </nav>
                    </div>
                </div>
            </div>
        </div>
    </div>
</header>

<!--=======content================================-->

<section class="content main-bot">
    <section class="container">
        <div class="row">
            <div class="grid_7">
                <h2>Latest news</h2>
                <div class="block-4">
                    <div class="clearfix block-4-ins">
                        <?php
							global $post;
							$args = array( 'posts_per_page' => 3, 'category_name' => 'news');
							$myposts = get_posts( $args );
							foreach( $myposts as $post ) :	setup_postdata($post); ?>
							<div class='text-1'>
							<?php the_date(); echo "<br />"; ?>
							<div>
							</div><h3><?php the_title(); ?></h3><br/></div>

							<div>
							 <?php the_content();?> 
							</div><br>
						<?php endforeach; ?> 


                    </div>             																									</div>
            </div>
            <div class="grid_5">
                
                
                <h2>testimonials</h2>
                <img src="../../images/icon-1.png" align="center" />
                
                <div class="block-5">
                    <div class="box-5">
                        <?php
							global $post;
							$args = array( 'posts_per_page' => 3, 'category_name' => 'testimonial' );
							$myposts = get_posts( $args );
							foreach( $myposts as $post ) :	setup_postdata($post); ?>
							<div class='text-1'>
							<?php the_date(); echo "<br />"; ?>
							<div>
							</div><h3><?php the_title(); ?></h3><br/></div>

							<div>
							 <?php the_content();?> 
							</div><br>
						<?php endforeach; ?> 
						
					 </div>
                </div>
            </div>
        </div>
    </section>
</section>





                    
 
<!--=======footer=================================-->

<footer>
    <div class="container">
        <div class="row">
            <div class="grid_12 clearfix">
                <div class="copyright"><span class="color-1">Word of Mouth </span>Family Dentistry &copy; <span id="copyright-year"></span> <span class="f-bord">|</span>  </div>
</div>
        </div>
    </div>
</footer>

</body>
</html>



