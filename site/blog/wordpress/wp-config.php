<?php
/**
 * The base configurations of the WordPress.
 *
 * This file has the following configurations: MySQL settings, Table Prefix,
 * Secret Keys, WordPress Language, and ABSPATH. You can find more information
 * by visiting {@link http://codex.wordpress.org/Editing_wp-config.php Editing
 * wp-config.php} Codex page. You can get the MySQL settings from your web host.
 *
 * This file is used by the wp-config.php creation script during the
 * installation. You don't have to use the web site, you can just copy this file
 * to "wp-config.php" and fill in the values.
 *
 * @package WordPress
 */

// ** MySQL settings - You can get this info from your web host ** //
/** The name of the database for WordPress */
define('DB_NAME', 'womblog');

/** MySQL database username */
define('DB_USER', 'drdonn');

/** MySQL database password */
define('DB_PASSWORD', 'Snow007!');

/** MySQL hostname */
define('DB_HOST', 'underconstruction.drdonndds.com');

/** Database Charset to use in creating database tables. */
define('DB_CHARSET', 'utf8');

/** The Database Collate type. Don't change this if in doubt. */
define('DB_COLLATE', '');

/**#@+
 * Authentication Unique Keys and Salts.
 *
 * Change these to different unique phrases!
 * You can generate these using the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}
 * You can change these at any point in time to invalidate all existing cookies. This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define('AUTH_KEY',         'zXyLz[PkUVn.C/=F$>`FR4[#YUEvVki}nZkjC,+cMUHIsq7.yLC,QKbGv2^]RPM0');
define('SECURE_AUTH_KEY',  'AQX@sO}K0SPNe4QxlCe,]bs&o}%*EAPJv_3l2Ks#,%[--EVJZH+@:jco$ggEO*Y~');
define('LOGGED_IN_KEY',    '*Wq^aEon%M TpcXGA|faX?Q5(q1;nxV^EIvTs3Dn`*oU5-I$IP#f<9:-!(Rpn B<');
define('NONCE_KEY',        'BCK z7-euS7xJs|zO7,z^!;%bp`Ifn_{]}vk3DjnJP}tXR|UKP#ln(&Nf!9M9mst');
define('AUTH_SALT',        ']}rixV`0Ze)X32C@FQW6blY+|51~+V_c,Sz,njVA-/&)+:rl*39^G}Ko+ln2h+gv');
define('SECURE_AUTH_SALT', '|Ns:i}ytKAE9~bHl/eLX*A)&C+}c-|2$%47^ ##jCOU-i}-Kcmp{BTi .R5bdCFN');
define('LOGGED_IN_SALT',   'F(PPU=TjHHJDSDvp4L*pF>0|D5|XRuE~oT|D^%9n9!B8*gu.XsVBA&5o=;C~q^V{');
define('NONCE_SALT',       '$HIF($U.CiTtc.u=c>_p1<]9#>qN%Y|cXaB$|#k3eKr;fppE0LxQ@XU+hE<C9xH4');

/**#@-*/

/**
 * WordPress Database Table prefix.
 *
 * You can have multiple installations in one database if you give each a unique
 * prefix. Only numbers, letters, and underscores please!
 */
$table_prefix  = 'wp_';

/**
 * For developers: WordPress debugging mode.
 *
 * Change this to true to enable the display of notices during development.
 * It is strongly recommended that plugin and theme developers use WP_DEBUG
 * in their development environments.
 */
define('WP_DEBUG', false);

/* That's all, stop editing! Happy blogging. */

/** Absolute path to the WordPress directory. */
if ( !defined('ABSPATH') )
	define('ABSPATH', dirname(__FILE__) . '/');

/** Sets up WordPress vars and included files. */
require_once(ABSPATH . 'wp-settings.php');
