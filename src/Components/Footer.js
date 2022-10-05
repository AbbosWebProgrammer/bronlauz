import React, {Component} from 'react';
import { YMInitializer } from 'react-yandex-metrika';

class Footer extends Component {



    render() {
        return (<>
            <div className="footer-footer-commit p-3 text-center  bottom-0">  © 2022 Bronla, Inc. </div>   
      <YMInitializer  accounts={[90594448]} options={{webvisor: true}} version="2"/>
            
            </>                    
        );
    }
}

export default Footer;