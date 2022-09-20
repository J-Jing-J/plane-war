import EnemyControl from "./EnemyControl";

const {ccclass, property} = cc._decorator;

@ccclass
export default class BulletControl extends cc.Component {

    @property
    speed: number = 800;  // 子弹一秒大概走一屏的距离，一屏设置的 大概是800
      
    start () {

    }

    update(dt) {
      // 移动, 每秒800像素
      this.node.y += this.speed * dt;
      // 出屏幕销毁
      if (this.node.y > 820) {
        this.node.destroy()
      }
    }
  
    // 子弹的碰撞方法 (other代表与其碰撞的物体的碰撞器，可以拿到对方的所有组件)
    onCollisionEnter(other) {
      // 如果碰到敌人，让敌人死亡，并销毁自己，
      // 必须后销毁自己，销毁后脚本就不执行了，也就没办法让敌人死亡了
      if (other.tag === 1) {
        // 通过tag值判断是否是敌人，tag值在面板上设置
        // 销毁敌人
        // other.node.destroy();  // 可以但不推荐，因为敌人销毁前可能会有一些动画等操作

        // other可以拿到对方的所有组件，从而可以调用对方的die方法
        other.getComponent(EnemyControl).die()
        // // 销毁自己
        this.node.destroy();
      }
    }
}
