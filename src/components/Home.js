import React, { useState, useEffect } from 'react';
import {Navbar, Nav, Container} from 'react-bootstrap';

import deskTop from '../assets/images/illustration-working.svg'
import recognition from '../assets/images/icon-brand-recognition.svg'
import detailedRecords from '../assets/images/icon-detailed-records.svg'
import fullyCustomizable from '../assets/images/icon-fully-customizable.svg'
import backgroundSvg from '../assets/images/bg-boost-desktop.svg'
import facebook from '../assets/images/icon-facebook.svg'
import twitter from '../assets/images/icon-twitter.svg'
import pinterest from '../assets/images/icon-pinterest.svg'
import instagram from '../assets/images/icon-instagram.svg'

function Home() {
    const [link, setLink] = useState('')
    const [shortLink, setShortLink] = useState([])
    const [linkError, setLinkError] = useState('')
    const [collapse, setCollapse] = useState(true)
    console.log('shortLink - :', shortLink)
    // getLinks()

    const getLinks = () => {
        if(localStorage.getItem("setLinks")){
            console.log(localStorage.getItem("setLinks"))
            let Items = localStorage.getItem("setLinks");
            if(Items == null) {
                setShortLink([])
            } else {
                setShortLink(JSON.parse(Items))
            }
        }
    }

    const changeLink = (event) => {
        setLink(event.target.value)
    }
    const onSubmit = (event) => {
        event.preventDefault();
        console.log('onSubmit', link)
        if(link == ''){
            setLinkError('Please add a link')
        } else {
            fetch(`https://api.shrtco.de/v2/shorten?url=${link}`)
            .then(res => res.json())
            .then(
            (result) => {
                console.log('result', result.result)
                var data = shortLink
                 data.unshift(result.result)
                 setShortLink([])
                 setTimeout(() => {
                    setShortLink(data)
                    console.log('shortLink - :', shortLink)
                    localStorage.setItem("setLinks",  JSON.stringify(shortLink));
                 }, 10)
            },
            (error) => {
                    console.log('error - :', error)
                }
            )
        }
    }

    const copyLink = (event, linkShort) => {
        const el = document.createElement('textarea');
        el.value = linkShort;
        document.body.appendChild(el);
        el.select();
        document.execCommand('copy');
        document.body.removeChild(el);
        event.target.innerHTML = 'Copied!'
        event.target.classList.add('copied-btn')
        event.target.classList.remove('copy-btn')
        event.target.classList.remove('btn-info')
    }

    useEffect(() => {
        getLinks();
      }, [])
  return (
    <div className="App">
      <section className="header">
          <div className="container">
            <Navbar bg="light" expand="lg">
                <Container>
                    <Navbar.Brand href="#home" className="fw-bold fs-4">Shortly</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto Features-nav">
                            <Nav.Link href="#">Features</Nav.Link>
                            <Nav.Link href="#">Pricing</Nav.Link>
                            <Nav.Link href="#">Resouces</Nav.Link>
                        </Nav>
                        <Nav className="ml-auto login-nav ps-3">
                            <Nav.Link href="#" className="pe-3">Login</Nav.Link>
                            <Nav.Link href="#" className="p-0"><button className="btn btn-info text-white signup-btn rounded-pill px-3">Sign up</button></Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

          </div>
      </section>

      <section className="my-lg-5 my-3 pb-5">
          <div className="container pb-5">
              <div className="row align-items-center">
                  <div className="col-md-6 col-11 mx-auto" style={{textAlign: 'left'}}>
                      <div className="fw-bold landing-intro lh-sm">More than just shorter links</div>
                      <p>Build your own brand's recognition and get detailed insights on how your links are performing.</p>
                      <button className="btn btn-info text-white rounded-pill px-4">Get Started</button>
                  </div>
                  <div className="col-md-6 col-11 mx-auto">
                      <img src={deskTop} alt="" className="img-fluid"/>
                  </div>
              </div>
          </div>
      </section>

      <section className="bg-light" style={{background: 'transparent'}}>
          <div className="container">
              <div className="row">
                <div className="w-100 " style={{marginTop: '-73px'}}>  
                      <div className="col-md-12 mb-5 px-0 position-relative col-11 mx-auto overflow-hidden custom-rounded" style={{background: `url(${backgroundSvg})`, backgroundPosition:'center', backgroundSize: 'cover'}}>
                          <div className="position-absolute h-100 w-100" style={{backgroundColor: '#4b3f6b', opacity: '0.7'}} >
                          </div>
                          <form className="p-md-5 p-3 w-100" style={{ zIndex: '999'}}> 
                              <div className="row align-items-baseline justify-content-center position-relative" style={{ zIndex: '99'}} >
                                  <div className="form-group col-md-10 col-12 my-2">
                                      <input type="email" className="form-control" value={link} onChange={changeLink} id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Shorten a link here"/>
                                      <span className=" mt-1 fw-bold error position-absolute" >{linkError}</span>
                                  </div>
                      
                                  <div className="form-group col-md-2 col-12 my-2">
                                      <button onClick={onSubmit} className="btn shortenBtn w-100 btn-info text-white">Shorten It!</button>
                                  </div>
                              </div>    
                          </form>
                      </div>
                
                    {
                        shortLink.map((item) => 
                            <>
                                <div className="col-md-12 col-11  mx-auto bg-white  py-2 mb-3 custom-rounded">
                                    <div className="row  align-items-center">
                                        <div className="col-lg-7 col-md-6 col-11 px-4 py-1 mx-auto text-start link-wrapper">
                                            <input  type="text" className="form-control o fw-bold original-link-input" value={item.original_link} readOnly/>
                                        </div>
                                        <div className="col-lg-3 col-md-3 col-11 px-4 py-1 mx-auto text-end short-link-wrapper">
                                            <input  type="text" className="form-control text-info fw-bold shorten-link-input" value={item.full_short_link} readOnly />
                                        </div>
                                        <div className="col-lg-2 col-md-3 px-4 py-1 col-11 mx-auto text-end">
                                            <button className="btn btn-info copy-btn text-white px-4" onClick={event => copyLink(event, item.full_short_link)} >copy</button>
                                        </div>
                                    </div>
                                </div>
                            </>
                        )
                    }


                      <div className="py-5">
                          <div className="fw-bold fs-3 text-center mt-3 mb-1">Advanced Statistics</div>
                          <p className="text-center col-md-8 col-11 mx-auto text-secondary">Track how your links are performing across the web with our advanced statistics dashboard</p>
                          <div className="mt-5 pt-5 position-relative" style={{textAlign: 'left'}} >
                              <div className="mx-auto bg-info  statistics-tree-bar"></div>
                              <div className="row ">
                                  <div className="col-md-4  col-11 mx-auto statistics-card-wrapper">
                                      <div className="shadow px-4 py-3 bg-white statistics-card ">
                                          <div className="position-relative">
                                              <div className="card-icon ">
                                                  <img src={recognition} alt="" className="w-100"/>
                                              </div>
                                          </div>
                                          <div className="h5 mt-5 mb-3 card-title" >Branch Recognition</div>
                                          <p><small>
                                              Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias quisquam reiciendis aut soluta numquam temporibus deleniti vel totam placeat. Ratione repellendus necessitatibus perferendis dignissimos voluptatibus
                                          </small></p>
                                      </div>
                                  </div>

                                  <div className="col-md-4 col-11 mx-auto statistics-card-wrapper">
                                      <div className="shadow px-4 py-3 bg-white statistics-card">
                                          <div className="position-relative">
                                              <div className="card-icon ">
                                                  <img src={detailedRecords} alt="" className="w-100"/>
                                              </div>
                                          </div>
                                          <div className="h5 mt-5 mb-3 card-title">Detailed Records</div>
                                          <p><small>
                                              Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias quisquam reiciendis aut soluta numquam temporibus deleniti vel totam placeat. Ratione repellendus necessitatibus perferendis dignissimos voluptatibus
                                          </small></p>
                                      </div>
                                  </div>

                                  <div className="col-md-4  col-11 mx-auto statistics-card-wrapper">
                                      <div className="shadow px-4 py-3 bg-white statistics-card">
                                          <div className="position-relative">
                                              <div className="card-icon ">
                                                  <img src={fullyCustomizable} alt="" className="w-100"/>
                                              </div>
                                          </div>
                                          <div className="h5 mt-5 mb-3 card-title">Fully Customizable</div>
                                          <p><small>
                                              Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias quisquam reiciendis aut soluta numquam temporibus deleniti vel totam placeat. Ratione repellendus necessitatibus perferendis dignissimos voluptatibus
                                          </small></p>
                                      </div>
                                  </div>

                              </div>
                          </div>
                      </div>

                </div>
              </div>
          </div>
      </section>

      <section>
          <div className="w-00 px-0 position-relative " style={{borderRadius: '10px', background: `url(${backgroundSvg})`, backgroundPosition: 'center', backgroundSize: 'cover'}}>
              <div className="position-absolute h-100 w-100" style={{backgroundColor: '#4b3f6b', opacity: '0.9'}} >
              </div>
              <div className="p-5 w-100 text-center position-relative" style={{ zIndex: '999'}}>
                  <div className="h3 mb-3 text-white">Boost your links today</div>
                  <button className="btn btn-info px-4 rounded-pill text-white">Get Started</button>    
              </div>
          </div>
      </section>

      {/* -- footer menu -- */}

      <section className="bg-dark" style={{textAlign: 'left'}}>
        <div className="container">
          <div className="row py-3 text-white">
            <div className="col-md-3 col-11 mx-auto py-md-4 py-2 px-md-0 px-3">
              <h5 className="my-md-4 my-2  h4 font-weight-bold">Shortly</h5>
            </div>
            
                  <div className="col-md-6 col-11 mx-auto  px-md-0 px-3">
                      <div className="row g-0">
                          <div className="col-md-4 col-12 py-md-4 py-2 px-md-0 px-3">
                              <div className="my-md-4 my-2  font-weight-bold">Features</div>
                              <div className=" custom-footer-menu text-light">
                                  <div>Link shortening</div>
                                  <div>Branded Links</div>
                                  <div>Analytics</div>
                              </div>
                          </div>
                          <div className="col-md-4 col-12 py-md-4 py-2 px-md-0 px-3">
                              <div className="my-md-4 my-2  font-weight-bold">Resouces</div>
                              <div className=" custom-footer-menu text-light">
                                  <div>Blog</div>
                                  <div>Developers</div>
                                  <div>Support</div>
                              </div>
                          </div>
              
                          <div className="col-md-4 col-12 py-md-4 py-2 px-md-0 px-3">
                              <div className="my-md-4 my-2  font-weight-bold">Company</div>
                              <div className=" custom-footer-menu text-light">
                                  <div>About</div>
                                  <div>Our Team</div>
                                  <div>Careers</div>
                              </div>
                          </div>
                      </div>
                  </div>

                  <div className="col-md-3 col-11 mx-auto  py-md-4 py-2 mt-4 px-md-0 px-3">
              <span className="footer-social-links"><img src={facebook} alt="" className="w-100"/></span>
              <span className="footer-social-links"><img src={twitter} alt="" className="w-100"/></span>
              <span className="footer-social-links"><img src={pinterest} alt="" className="w-100"/></span>
              <span className="footer-social-links"><img src={instagram} alt="" className="w-100"/></span>
            </div>
            
          </div>
        </div>
      </section>


    </div>
  );
}

export default Home;
