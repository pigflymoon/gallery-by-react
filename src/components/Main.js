require('normalize.css/normalize.css');
require('styles/App.scss');

import React from 'react';

//获取图片相关的数据


let yeomanImage = require('../images/1.jpg');

class AppComponent extends React.Component {
    render() {
        return (
            <div className="index">
                <img src={yeomanImage} alt="Yeoman Generator" />
                <div className="notice">Please edit <code>src/components/Main.js</code> to get started!</div>
            </div>
        );
    }
}

AppComponent.defaultProps = {
};

export default AppComponent;
