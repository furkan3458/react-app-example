import React from 'react';
import {Cloudinary} from "@cloudinary/url-gen";
import { Image } from 'react-bootstrap';
const cld = new Cloudinary({
    cloud: {
      cloudName: 'bookerapp'
    }
});

interface CldPropsType{
    name:string,
    folder:string,
    width?:number,
    height?:number,
}

const CldImageComponent = (props:CldPropsType) => {
    const myImage = cld.image(props.folder+"/"+props.name);
    myImage.format('jpg');

    if(props.width && props.height)
    return (
        <Image src={myImage.toURL()} width={props.width} height={props.height}/>
    );
    else
    return (
        <Image src={myImage.toURL()} style={{width:"100%", height:"100%"}}/>
    );
};

export default CldImageComponent;
