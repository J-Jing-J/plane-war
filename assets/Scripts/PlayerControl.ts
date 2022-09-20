const {ccclass, property} = cc._decorator;

@ccclass
export default class PlayerControl extends cc.Component {

    // 创建子弹预设体
    @property(cc.Prefab)
    bulletPre: cc.Prefab = null
    
    start () {
      // 用事件监听的方式控制player移动
      let self = this;
      this.node.on(cc.Node.EventType.TOUCH_MOVE, (event) => {
          // 如果用function匿名函数，这里注意必须用self，而箭头函数可以用this
        // 使node的坐标和鼠标的坐标相同
        this.node.setPosition(event.getLocation())
      })
      // 每隔一段时间攻击一次（计时器）
      this.schedule(() => {
        // 创建子弹
        // 去面板关联子弹预设体与玩家，然后用子弹预设体创建子弹实例
        let bullet = cc.instantiate(this.bulletPre)
        // 设置子弹父物体：需要让组价在最外层 (场景)
        bullet.setParent(cc.director.getScene())
        // 子弹位置
        bullet.x = this.node.x;
        bullet.y = this.node.y + 60;

        // 第二参：间隔时间
        // 第三参：重复多少次
        // 第四参：是否开始的瞬间就调用
      }, 0.5, 100, 0)

      // 开启碰撞检测，在玩家的脚本中执行 因为玩家脚本只执行一次
      cc.director.getCollisionManager().enabled = true;
    }

    update(dt) {
      // 攻击
    }
  
    
    
}
