import React from 'react';

function Footer2 (props) {
    return (
        <footer className="page-footer">
        
        <div className="container-fluid text-center text-md-left">
            
            <div className="row page-footer">
                <div className="social-media col-12 col-sm-12 col-md-4 col-lg-4 col-xl-4">
                    <div className="row">
                        <a className="spaces" href="https://facebook.com/nirvana_spa">
                            <img src="/assets/images/other/facebook.svg" width="20px"/>
                        </a>
                        <a className="spaces" href="https://instagram.com/nirvana_spa">
                            <img src="/assets/images/other/instagram.svg" width="20px"/>
                        </a>
                        <a className="spaces" href="https://twitter.com/nirvana_spa">
                            <img src="/assets/images/other/twitter.svg" width="20px"/>
                        </a>
                        <a className="spaces" href="https://pinterest.com/nirvana_spa">
                            <img src="/assets/images/other/pinterest.svg" width="20px"/>
                        </a>
                    </div>
                </div>
                
                <div className="footer-info col-12 col-sm-12 col-md-8 col-lg-8 col-xl-8">
                    
                    <p>Tratamientos únicos para tu cuerpo y tus sentidos.</p>
                </div>
            </div>
        </div>
        
        <div className="footer-copyright">© 2020 Copyright:
            <a className="footer-copyright" href="https://SpaNirvana.com/"> SpaNirvana.com</a>
        </div>
    </footer>
    )
}

export default Footer2;