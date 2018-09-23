- # TODO LIST

    ### 要求

    - 服务器：Node.js
    - 数据库：MongoDB，根据教程自行安装
    - 网页布局已写好，只需要完成对应的逻辑statics/index.js文件以及服务器server.js文件

    ### 需求描述

    - 添加TODO
      - 「ALL」和「ACTIVE」环境下：
        - 在输入框中输入待办事项，按回车键添加一条待办事项，出现在输入框的下方，包含项目符号、内容、删除标记「x」，删除标记「x」只在鼠标放在该条事项上时候出现
        - 当什么都没输入时，点回车键不会有任何todo被添加
        - 每添加一个todo，「Left items：」数量+1
      - 「COMPLETED」环境下：
        - 在输入框中输入待办事项，按回车，只有「Left items：」数量+1
        - 当什么都没输入时，按回车，无任何反应
    - 修改TODO状态
      - 「ALL」环境下：
        - 点击某条待办事项，该事项前面的项目符号变实心，文字出现删除线，「Left items：」数量-1，「COMPLETED」按钮右侧出现「Clear Completed」按钮
        - 进入「COMPLETED」环境，可以看到刚删除的事项
      - 「ACTIVE」环境下：
        - 点击某条待办事项，事项消失，「Left items：」数量-1，「Clear Completed」按钮出现
        - 进入「COMPLETED」环境，可以看到刚完成的事项
      - 「COMPLETED」环境下：
        - 点击某条待办事项，事项消失，「Left items：」数量+1，在「ALL」和「ACTIVE」中能看到该事项，显示「未完成」状态
        - 已完成事项的数量为0时，「Clear Completed」按钮消失，否则存在
    - 删除TODO
      - 删除「未完成」的TODO
        - 点击未完成事项后面的删除标记「x」，事项消失，「Left Completed」数量-1
      - 删除「已完成」的TODO
        - 「ALL」和「COMPETED」环境下：
          - 点击某条事项后面的删除标记「x」，可以删除一条事项
          - 删除全部的已完成TODO后，「Clear Completed」按钮消失，否则存在
          - 点击「Clear Completed」按钮，所有已完成事项删除，「Clear Completed」按钮消失
        - 「ACTIVE」环境下：
          - 如果存在已完成事项，点击「Clear Completed」按钮，删除所有已完成TODO，按钮消失，在「COMPLETED」环境下看不到任何TODO
          - 如果不存在，不显示「Clear Completed」按钮
    - 查看TODO
      - 「ALL」环境下：
        显示所有「已完成」和「未完成」的待办事项
      - 「ACTIVE」环境下；
        只显示「未完成」待办事项
      - 「COMPLETED」环境下：
        只显示「已完成」待办事项
