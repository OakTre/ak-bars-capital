const {src, dest, series, watch, parallel} = require("gulp");
const sass = require('gulp-sass')(require('sass'));
const prefixer = require("gulp-autoprefixer");
const cleanCSS = require("gulp-clean-css");
const rename = require("gulp-rename");
const notify = require("gulp-notify");
const webpack = require("webpack");
const webpackStream = require("webpack-stream");
const uglify = require("gulp-uglify-es").default;
const browserSync = require("browser-sync").create();
const pug = require("gulp-pug");
const sourcemaps = require("gulp-sourcemaps");
const imagemin = require("gulp-imagemin");
const svgSprite = require("gulp-svg-sprite");
const webp = require("gulp-webp");
const del = require("del");
const gcmq = require("gulp-group-css-media-queries");
const pugInclude = require("pug-include-glob");
const concat = require("gulp-concat");

const pugBuild = () => {
	return src("./src/pug/*.pug")
		.pipe(pug({ pretty: true, plugins: [pugInclude()] }))
		// для build
		// .pipe(rename(function (path) {
		// 	path.extname = ".php"
		// }))
		.pipe(dest('./app/local/html/'))
		.pipe(browserSync.stream());
};

const styles = () => {
	return src("./src/scss/**/*.scss")
		.pipe(sass({
			outputStyle: 'compressed'
		}).on("error", notify.onError()))
		.pipe(rename({
			suffix: ".min"
		}))
		.pipe(prefixer({
			cascade: false,
			overrideBrowserslist: ['last 10 version'],
			grid: "no-autoplace",
		}))
		// .pipe(cleanCSS({
		// 	level: 2
		// }))
		.pipe(gcmq())
		.pipe(dest("./app/local/assets/css/"))
		.pipe(browserSync.stream());
}

const stylesVendor = () => {
	return src("./src/scss/vendor.scss")
			.pipe(sass({
					outputStyle: 'compressed'
			}).on("error", notify.onError()))
			.pipe(rename({
					suffix: ".min"
			}))
			// .pipe(cleanCSS({
			// 		level: 2
			// }))
			.pipe(dest("./app/local/assets/css/"))
}

const scripts = () => {
	return src("./src/js/**/*.js")
		.pipe(uglify().on("error", notify.onError()))
		.pipe(dest("./app/local/assets/js"))
		.pipe(browserSync.stream());

}

const scriptsVendor = () => {
	return src('./src/js/vendor/**.js')
	.pipe(concat('vendor.js'))
	.pipe(uglify().on("error", notify.onError()))
	.pipe(dest('./app/local/assets/js/'))
	.pipe(browserSync.stream());
}

const svgSprites = () => {
	return src("./src/img/sprite/*.svg")
		.pipe(svgSprite({
			mode: {
				stack: {
					sprite: "../sprite.svg"
				}
			},
			shape: {
				transform: [
				  {
					svgo: {
					  plugins: [
						{
						  removeAttrs: {
							attrs: ['class', 'data-name', 'fill.*', 'stroke.*'],
						  },
						},
					  ],
					},
				  },
				],
			  },
		}))
		.pipe(dest("./app/local/assets/img"))
}

const imgToApp = () => {
	return src("./src/img/**/*.{png,jpg,jpeg,svg}")
		.pipe(dest("./app/local/assets/img/"))
}

const copySvg = () => {
	return src("./src/img/sprite/*.svg")
	.pipe(dest("./app/local/assets/img/sprite"));
}

const copyFonts = () => {
	return src("./src/fonts/**")
	.pipe(dest("./app/local/assets/fonts"));
}

const resourses = () => {
	return src("./src/include/**")
		.pipe(dest("./app/local/include"));
}

const clean = () => {
	return del(["./app/*"])
}

// преобразовать изображения в wbp
const toWebp = () => {
	return src("src/img/**/*.{png,jpg,jpeg}")
	  .pipe(webp({ quality: 90 }))
	  .pipe(dest("app/local/assets/img"));
};

const watchFiles = () => {
	browserSync.init({
		server: {
			baseDir: "./app"
		}
	});

	watch("./src/scss/**/**.scss", styles)
	watch("./src/pug/**/*.pug", pugBuild)
	watch("./src/img/**/*.{png,jpg,jpeg,svg}", imgToApp)
	watch("./src/img/sprite/*.svg", svgSprites)
	watch("./src/resourses/**", resourses)
	watch("./src/js/**/*.js", scripts)
	watch("./src/js/vendor/**.js", scriptsVendor)
	watch("./src/img/*.{png,jpg,jpeg}", toWebp)
}

exports.styles = styles;
exports.watchFiles = watchFiles;
exports.pugBuild = pugBuild;
exports.webp = toWebp;

exports.default = series(clean, parallel(pugBuild, scripts, scriptsVendor, stylesVendor, imgToApp, toWebp, svgSprites, copySvg, copyFonts, resourses), styles, watchFiles);

// оптимизировать изображения ---- gulp.minifyImg
const minifyImg = () => {
	return src("src/img/**/*.{png,jpg,jpeg}")
		.pipe(imagemin([
			imagemin.optipng({ optimizationLevel: 3 }),
			imagemin.mozjpeg({ quality: 75, progressive: true }),
		]))
		.pipe(dest('app/local/assets/img'));
};

exports.minifyImg = minifyImg;
