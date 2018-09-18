# TODO LIST

### 要求
- 服务器：Node.js
- 数据库：MongoDB，根据教程自行安装
- 网页布局已写好，只需要完成对应的逻辑statics/index.js文件以及服务器server.js文件

### 需求描述
- 添加TODO
    - 在输入框中输入待办事项，按回车键添加一条待办事项
    - 刚添加的待办事项出现在输入框的下方，包含三个部分：项目符号、内容、删除按钮「x」，删除标记「x」只在鼠标放在该条事项上时候出现
    - 当什么都没输入时，点回车键不会有任何todo被添加
    - 如果待办事项数量>1，则显示「Clear Completed」按钮，否则不显示
    - 当底部按钮选中「ACTIVE」时，输入框中添加todo，会显示新添加的todo，同时底部的「Left items:」加1
    - 当底部按钮选中「COMPLETED」时，输入框中添加todo，不会显示新添加的todo，只有底部的「Left items:」加1
- 完成TODO
    - 点击某条待办事项，代表完成该事项，点击后该事项前面的项目符号改变，文字变灰色并出现删除线
    - 最底部的「Left items:」数字发生相应改变，三个按钮的右侧出现「Clear Completed」按钮
- 删除TODO
    - 通过删除标记「x」删除
        - 点击某条事项后面的删除标记「x」，可以删除一条事项
        - 删除后的事项从面板中消失
    - 通过「Clear Completed」删除已完成事项
        - 点击最底部的「Clear Completed」按钮，删除所有已完成事项
    NOTE：注意用户点击「Clear Completed」时底部按钮选择的时「ALL」还是「ACTIVE」还是「COMPLETED」
- 查看TODO
    - 最底部的三个按钮，「ALL」「ACTIVATE」「COMPLETED」，默认是「ALL」，也就是显示所有待办事项，点击「COMPELETED」时，只显示已完成的代办事项，点击「ACTIVE」时，只显示未完成的待办事项
