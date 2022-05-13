'use strict';

import gulp from 'gulp';
import pug from 'gulp-pug';
import browserSync from 'browser-sync';
import fs from 'fs';
import del from 'del';
import path from 'path';
var juice = require('@thasmo/gulp-juice');
const $ = require("gulp-load-plugins")({lazy: true});
const config = require("./gulp.config")(args);
const htmlmin = require('gulp-html-minifier');
const runSequence = require('run-sequence');
const args = require("yargs").argv;
const ftp = require("vinyl-ftp");
const reload = browserSync.reload;

gulp.task('images', ()=>{
    return gulp.src(config.img.in)
    // .pipe($.imagemin())
    .pipe(gulp.dest(config.img.out))
});

// gulp.task('copy', ()=>{
//   return gulp.src(config.ics.in)
//   .pipe(gulp.dest(config.ics.out))
// });

gulp.task('boilerplate',()=>{
  //Name param
  return gulp.src(`.${config.src}/settings/boilerplate/**/*`)
  .pipe(gulp.dest(`.${config.email_src}/${args.name}`));
});

gulp.task('index',()=> {
    let dirs = config.helpers.getFolders('.'+config.email_src);
    return gulp.src(config.index)
    .pipe(pug({
        locals: {links: dirs}
    }))
    .pipe(gulp.dest(config.dest))
    .pipe(reload({stream:true}))
});

gulp.task('fragments',()=> {
  let dirs = config.helpers.getFolders(`./${config.email_src}`);
  return gulp.src(`.${config.email_src}**/fragments/*.pug`)
  .pipe(pug({basedir: "src"}))

  .pipe(juice({
    includeResources:true,
    removeStyleTags:false,
    preserveMediaQueries: true,
    webResources:{ links:true, scripts:false, images:false, relativeTo: "."}
  }))
  .pipe(gulp.dest(config.dest))
  .pipe(reload({stream:true}))
});



gulp.task('inline',['pug'], function(){
   return gulp.src("dist/**/index.html")
        .pipe(juice({
          includeResources:true,
          removeStyleTags:false,
          preserveMediaQueries: true,
          webResources:{ links:true, scripts:false, images:false, relativeTo: "."}
        }))
        .pipe(gulp.dest("dist"))
});

gulp.task('pug', ()=>{
    let c_path = "";
    return gulp.src(`.${config.email_src}**/index.pug`)
    .pipe($.data((file) => {
      c_path = path.relative(__dirname, path.dirname(file.path));
      let data = `./${c_path}/data.json`;
      if(fs.existsSync(data)){
        return JSON.parse(fs.readFileSync(data));
      }
    }))
    .pipe(pug({basedir: "src", pretty: true}))
    .pipe(juice({
      includeResources:true,
      removeStyleTags:false,
      preserveMediaQueries: true,
      webResources:{ links:true, scripts:false, images:false, relativeTo: "."}
    }))
    .pipe(gulp.dest(config.dest))
    .pipe(reload({stream: true}))
});
gulp.task('clean',(cb)=>{
     del.sync([config.dest],cb);
})
gulp.task('server', ()=>{
    browserSync.init({
        server:{
            baseDir: config.server.root
        },
        ghostMode: false,
        logPrefix: "Email-Template",
        logFileChanges: false,
        online: false,
        notify:false
    });
    gulp.watch([config.index,`.${config.email_src}**/*.pug`],['index'])
    .on("change", (event) => {
        config.helpers.changeMsg(event);
    });
    gulp.watch(['src/includes/*','src/layout/*.pug',`.${config.email_src}**/*.pug`, `.${config.email_src}**/data.json`],['pug'])
    .on("change", (event) => {
        config.helpers.changeMsg(event);
    });
    gulp.watch(`src/**/img/*`,{cwd:'./'},['images'])
    .on("change", (event) => {
      reload()
    })
    gulp.watch(`.${config.email_src}**/styles/*.{css,scss}`,['pug'])
      .on("change", (event) => {
        config.helpers.changeMsg(event);
    })
});

gulp.task('lint-css', () => {
  return gulp
    .src(`.${config.email_src}**/styles/*.{css,scss}`)
    .pipe($.stylelint({
      failAfterError: false,
      reporters: [
        {formatter: 'string', console: true}
      ]
    }));
});


//FTP
gulp.task('ftp', () => {

  let conn = ftp.create( {
    host:     config.ftp.host,
    user:     config.ftp.user,
    password: config.ftp.pass,
    parallel: 10,
    log:      $.util.log,
    secure: true,
    secureOptions : { rejectUnauthorized: false }
  });
  let globs = [
    '!dist/index.html',
    'dist/**'
  ]
  let dirs = config.helpers.getFolders('.'+config.email_src);
    return gulp.src( globs, {  base: `./dist/${dirs[0]}`, buffer: false })
    .pipe(conn.newer( `.${config.ftp.path}${dirs[0]}` )) // only upload newer files
    .pipe(conn.dest( `${config.ftp.path}${dirs[0]}` ));
});

//ZIP email
gulp.task('zip', ["deploy"], () => {

   let dirs = config.helpers.getFolders('.'+config.email_src);
    return dirs.map((folder) => {
        let f_path = path.join(config.zip_path, folder, '**/*');
        return gulp.src(f_path)
            .pipe($.zip(`${folder}.zip`))
            .pipe(gulp.dest(`${config.zip_path}/zips`));
    });
});

gulp.task('deploy', () => {
  return gulp.src("dist/**/index.html")
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe($.htmlhint({htmlhintrc: ".htmlhintrc"}))
    .pipe($.htmlhint.reporter())
    .pipe(gulp.dest(config.dest))
});

gulp.task('build',['clean','index','images','pug','fragments']);

gulp.task('default', () =>{
    runSequence('index','images','pug','server');
    $.util.log($.util.colors.green("Project Start"));
});
