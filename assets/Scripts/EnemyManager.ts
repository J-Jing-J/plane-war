const {ccclass, property} = cc._decorator;

@ccclass
export default class EnemyManager extends cc.Component {

    // 由于敌机一开始是不存在的，所以先把敌机拖成预设体，在脚本中通过预设体创建敌机
    
    //敌机预设体
    @property(cc.Prefab)
    enemyPre: cc.Prefab = null;

    
    start () {
      // 每隔2s创建一个敌机
      this.schedule(() => {
        let enemy = cc.instantiate(this.enemyPre);
        enemy.setParent(cc.director.getScene())
        enemy.y = this.node.y; // y轴跟空节点水平
        enemy.x = Math.random() * 400 + 20;  //屏幕宽度是420，敌机生成在x轴的0-420随机数之间
        // cocos提供的计时器，单位是秒，cocos的比setTimeout更兼容
        // 通过第三个参数repeat实现setTimeout和setInterval
      }, 2)
    }

}
