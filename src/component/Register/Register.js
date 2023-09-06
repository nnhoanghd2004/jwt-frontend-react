import React from 'react'
import { useNavigate } from "react-router-dom"

export default function Register() {
    const navigate = useNavigate();
    return (
        <div className='container pt-5' >
            <div className='row'>
                <div className='col-md-2 col-lg-3 col-xl-4'></div>
                <div className='col-sm-12 col-md-8 col-lg-6 col-xl-4  rounded' style={{ backgroundColor: "white" }}>
                    <div className='d-flex justify-content-center mt-3'>
                        <h2 className='d-flex '>Hoang</h2>
                    </div>
                    <form>
                        <div class="form-outline my-3">
                            <input type="email" id="form2Example1" class="form-control py-3" placeholder='Email address' />
                        </div>

                        <div class="form-outline my-3">
                            <input type="password" id="form2Example2" class="form-control py-3" placeholder='Password' />
                        </div>

                        <div class="form-outline my-3">
                            <input type="text" id="form2Example1" class="form-control py-3" placeholder='Username' />
                        </div>

                        <div class="form-outline my-3">
                            <input type="text" id="form2Example2" class="form-control py-3" placeholder='Address' />
                        </div>

                        <div class="form-outline my-3">
                            <input type="text" id="form2Example1" class="form-control py-3" placeholder='Phone' />
                        </div>

                        <div>Sex</div>
                        <div class="input-group">
                            <div class="input-group-text">
                                <input class="mt-0" type="radio" name='sex' />
                            </div>
                            <input type="text" class="form-control" value="Male" />
                            <div class="input-group-text">
                                <input class="mt-0" type="radio" name='sex' />
                            </div>
                            <input type="text" class="form-control" value="Male" />
                        </div>
                        {/* <div class="form-outline my-3">
                            <input type="radio" id="Male" class="form-control py-3" />
                            <label for="html">Male</label><br />
                            <input type="radio" id="Femal" class="form-control py-3" />
                            <label for="html">Femal</label><br />
                            <input type="radio" id="Other" class="form-control py-3" />
                            <label for="html">Other</label><br />
                        </div> */}

                        <div class="row my-4">
                            <div class="col">
                                <a href="#!">Forgot password?</a>
                            </div>
                        </div>
                        <div className='row mt-3 d-flex justify-content-around'>
                            <button type="button" class="btn btn-success btn-block mb-4 col-5">Register</button>
                            <button class="btn btn-secondary btn-block mb-4 col-5" onClick={() => navigate("/login")}>
                                Login
                            </button>
                        </div>

                    </form>
                </div>
            </div>
        </div>
    )
}
