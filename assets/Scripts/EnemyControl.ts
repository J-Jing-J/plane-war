const {ccclass, property} = cc._decorator;

@ccclass
export default class EnemyControl extends cc.Component {

    // 是否死亡
    isDie: boolean = false;
  
    start () {

    }

    update(dt) {
      if (this.isDie == false) {
        // 敌人是从上到下移动的，出屏幕后销毁
        this.node.y -= 300 * dt;
      }
      if (this.node.y < -850) {
        this.node.destroy() 
      }
    }
  
  
    // 死亡
    die() {
      this.isDie = true
      // 死亡后的半秒变成爆炸图片，然后再销毁
      // 动态加载
      // 参一：资源名，参二：类型，参三：回调
      cc.loader.loadRes("enemy0_die", cc.SpriteFrame, (err, res) => {
        // 拿到精灵组件，因为要换精灵的图片
        // 把精灵组件的spriteFrame换成加载进来的res
        this.node.getComponent(cc.Sprite).spriteFrame = res;
      })

      // 300ms后销毁
      setTimeout(() => {
        this.node.destroy()
        // 由于这个API不是cocos提供的，所以单位不是秒而是毫秒
      }, 300);
    }
}
