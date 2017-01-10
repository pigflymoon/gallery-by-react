require('normalize.css/normalize.css');
require('styles/App.scss');

import React from 'react';

//获取图片相关的数据
let imageDatas = require('../data/imageDatas.json');

//利用自执行函数,将图片名信息转化为图片url信息
imageDatas = (function genImageURL(imageDatasArr) {
    for (var i = 0, j = imageDatasArr.length; i < j; i++) {
        var singleImageData = imageDatasArr[i];

        singleImageData.imageURL = require('../images' +
            singleImageData.fileName);
        imageDatasArr[i] = singleImageData;
    }

    return imageDatasArr;
})(imageDatas);


var GalleryByReactApp = React.createClass({
    Constant: {
        centerPos: {
            left: 0,
            right: 0
        },
        //水平方向取值范围
        hPosRange: {
            leftSecX: [0, 0],
            rightSecX: [0, 0],
            y: [0, 0]
        },
        //垂直方向的取值范围
        vPosRange: {
            x: [0, 0],
            topY: [0, 0]
        }
    },
    /**
     * 重新布局所有图片
     * @param centerIndex 指定居中排布哪个
     */
    rearrange: function (centerIndex) {

    },

    getInitialStage: function () {
        return {
            imgArrangeArr: [
                /**
                 {
                     pos: {
                         left: '0',
                         top: '0'
                     }
                 }*/
            ]
        }
    },

    //组件加载以后,为每一张图片计算其位置的范围
    componentDidMount: function () {

        //先拿到舞台的大小
        var stageDOM = React.findDOMNode(this.refs.stage),
            stageW = stageDOM.scrollWidth,
            stageH = stageDOM.scrollHeight,
            halfStageW = Math.ceil(stageW / 2),
            halfStageH = Math.ceil(stageH / 2);

        //拿到imageFigure的大小
        var imgFigureDOM = React.findDOMNode(this.refs.imgFigure0),
            imgW = imgFigureDOM.scrollWidth,
            imgH = imgFigureDOM.scrollHeight,
            halfImgW = Math.ceil(imgW / 2),
            halfImgH = Math.ceil(imgH / 2);

        this.Constant.centerPos = {
            left: halfImgW - halfImgH,
            top: halfStageH - halfImgH
        };
        //计算左侧,右侧图片排布取值范围

        this.Constant.hPosRange.leftSecX[0] = -halfImgW;
        this.Constant.hPosRange.leftSecX[1] = halfStageW - halfImgW * 3;
        this.Constant.hPosRange.rightSecX[0] = halfStageW - halfImgW;
        this.Constant.hPosRange.rightSecX[1] = stageW - halfImgW;
        this.Constant.hPosRange.y[0] = -halfImgH;
        this.Constant.hPosRange.y[1] = stageH - halfImgH;
        //计算上侧区域图片排布位置的取值范围
        this.Constant.vPosRange.topY[0] = -halfImgH;
        this.Constant.vPosRange.topY[1] = halfStageH - halfImgH * 3;
        this.Constant.vPosRange.x[0] = halfImgW - imgW;
        this.Constant.vPosRange.x[1] = halfImgW;

        this.rearrange(0);
    },

    render: function () {

        var controllerUnits = [],
            imgFigures = [];

        imageDatas.forEach(function (value, index) {
            if(!this.stage.imgsArrangeArr[index]){
                this.stage.imgsArrangeArr[index] = {
                    pos:{
                        left:0,
                        right:0
                    }
                }
            }
            imgFigures.push(<ImgFigure data={value} ref={'imgFigure' + index}/>)
        }.bind(this));

        return (
            <section className="stage" ref="stage">
                <section className="img-sec">
                    {imgFigures}
                </section>
                <nav className="controller-nav">
                    {controllerUnits}
                </nav>
            </section>
        )

    }
});

GalleryByReactApp.defaultProps = {};

export default GalleryByReactApp;
