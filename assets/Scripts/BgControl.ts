// 这个脚本挂载到了bg这个空节点上，
// 因为这个节点是background的父节点，两个background有相同的逻辑，都是向上到一定高度后恢复，所以放在公共父节点上
const {ccclass, property} = cc._decorator;

@ccclass
export default class BgControl extends cc.Component {

    start () {

    }

    update(dt) {
      // 由于背景每一帧都需要移动，所以放到update中
      // 遍历子物体（背景）：
      for (let bgNode of this.node.children) {
        // 移动 (setPosition / y = xxx)    position.y=xxx有时没效果
        // 不同性能的电脑帧率不同，需要统一时间，避免背景速度不一样，从帧改为秒
        // 每秒移动50像素
        bgNode.y -= 50 * dt  // dt代表帧之间的间隔时间
        // 当某背景完全移出了屏幕，就重新放到最上面
        if (bgNode.y < -850) {
          bgNode.y += 852 * 2
        }
      }
    }
}
