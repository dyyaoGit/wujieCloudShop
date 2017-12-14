import router from './router'
import NProgress from 'nprogress' // Progress 进度条
import 'nprogress/nprogress.css'// Progress 进度条样式

router.beforeEach((from, to, next) => {
  NProgress.start()
    // console.log(to.meta.title)
  if(!to.meta.title){
    document.title = '无界云店后台管理系统';
  }else{
    document.title = to.meta.title;
  }
  next()
})


router.afterEach(() => {
  NProgress.done()
})
