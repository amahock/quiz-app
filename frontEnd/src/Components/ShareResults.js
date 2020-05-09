import React, { Fragment } from "../../node_modules/@types/react";
import { FacebookShareButton,
TwitterShareButton,
WhatsappShareButton,EmailShareButton,EmailIcon,
FacebookIcon,TwitterIcon,WhatsappIcon } from '../../node_modules/react-share/lib';
// import {Button,Glyphicon} from "bootstrap";

const ShareResult = (props) => {

        const iconSize = "2.5rem";

      return (
        <Fragment>
            <FacebookShareButton
                url={props.url}
                quote={props.text}>
                <FacebookIcon style={{marginRight:16+'px'}} size={iconSize} />
            </FacebookShareButton>
    
        <TwitterShareButton
                url={props.url}
                title={props.text}>
                <TwitterIcon style={{marginRight:16+'px'}} size={iconSize}/>
        </TwitterShareButton>
    
        <EmailShareButton
            subject={`Check out what I did on GoodWerk`}
            body={`${props.text}: ${props.url}`}>
            <EmailIcon style={{marginRight:16+'px'}} size={iconSize}/>
        </EmailShareButton>

        <WhatsappShareButton
            url={props.url}
            title={props.text}>
            <WhatsappIcon style={{marginRight:16+'px'}} size={iconSize}/>
        </WhatsappShareButton>

      </Fragment>
      )
}

export default ShareResult;