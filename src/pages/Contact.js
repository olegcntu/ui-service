import React from 'react'
import Meta from "../components/Meta";
import BreadCrumb from "../components/BreadCrumb";
import {AiOutlineHome, AiOutlineMail} from "react-icons/ai";
import {BiPhoneCall, BiInfoCircle} from "react-icons/bi";
import Container from "../components/Container";

function Contact() {
    return (
        <>
            <Meta title={"Contact Us"}/>
            <BreadCrumb title="Contact Us"/>
            <Container class1="contact-wrapper py-5 home-wrapper-2">
                    <div className="row">
                        <div className="col-12">
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d9931.639231791904!2d31.29775672415308!3d51.51487065570275!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x46d548684b150005%3A0xef8bb6cb6fe34c1a!2z0L_RgC3Rgi4g0JvQtdCy0LrQuCDQm9GD0LrRjNGP0L3QtdC90LrQviwgNDgsINCn0LXRgNC90LjQs9C-0LIsINCn0LXRgNC90LjQs9C-0LLRgdC60LDRjyDQvtCx0LvQsNGB0YLRjCwgMTQwMDA!5e0!3m2!1sru!2sua!4v1682937913253!5m2!1sru!2sua"
                                width="600"
                                height="450"
                                className="border-0 w-100"
                                allowFullScreen=""
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade">
                            </iframe>
                        </div>
                        <div className="col-12 mt-5">
                            <div className="contact-inner-wrapper d-flex justify-content-between ">
                                <div>
                                    <h3 className="contact-title mb-4">Contact</h3>
                                    <form action="" className="d-flex flex-column gap-15">
                                        <div>
                                            <input type="text" className="form-control" placeholder="name"/>
                                        </div>
                                        <div>
                                            <input type="email" className="form-control" placeholder="E-mail"/>
                                        </div>
                                        <div>
                                            <input type="tel" className="form-control" placeholder="mobile number"/>
                                        </div>
                                        <div>
                                            <textarea
                                                placeholder="comments"
                                                name="" id=""
                                                className="w-100 form-control"
                                                cols="30"
                                                rows="4">

                                            </textarea>
                                        </div>
                                        <div>
                                            <button className="button border-0">Submit</button>
                                        </div>
                                    </form>
                                </div>
                                <div>
                                    <h3 className="contact-title mb-4">Get in touch with us</h3>
                                    <div>
                                        <ul className="ps-0">
                                            <li className="mb-3 d-flex gap-15 align-items-center">
                                                <AiOutlineHome className="fs-5"/>
                                                <address className=" mb-0">Hno:277, Near village chopal,Mandora, 20 Haryana </address>
                                            </li>
                                            <li className="mb-3 d-flex gap-15 align-items-center">
                                                <BiPhoneCall className="fs-5"/>
                                                <a href="tel:+380969794628">+380969794628</a>
                                            </li>
                                            <li className="mb-3 d-flex gap-15 align-items-center">
                                                <AiOutlineMail className="fs-5"/>
                                                <a href="mailto:oleg.krasavcik.41@gmail.com">oleg.krasavcik.41@gmail.com</a>
                                            </li>
                                            <li className="mb-3 d-flex gap-15 align-items-center">
                                                <BiInfoCircle className="fs-5"/>
                                                <p className="mb-0">Monday-Friday 10AM to 8 PM</p>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
            </Container>
        </>
    )
}

export default Contact
