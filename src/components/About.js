import React from 'react';

export default function About() {
    return (
        <div className='container-fluid mt-3 bg-transparent'>
            <h3 className='text-center'>About Us</h3>
            <div className="accordion mt-3" id="accordionFlushExample">
                <div className="accordion-item bg-transparent">
                    <h2 className="accordion-header">
                        <button className="accordion-button collapsed bg-transparent" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
                            #1 Fast and Usefull ---&gt;
                        </button>
                    </h2>
                    <div id="flush-collapseOne" className="accordion-collapse collapse" data-bs-parent="#accordionFlushExample1">
                        <div className="accordion-body">
                            This project is build in react which means that this application is really fast and it has reduced data consumption. There are several functionalities of this app that you can enjoy.
                        </div>
                    </div>
                </div>
                <div className="accordion-item bg-transparent">
                    <h2 className="accordion-header">
                        <button className="accordion-button collapsed bg-transparent" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseTwo" aria-expanded="false" aria-controls="flush-collapseTwo">
                            #2 Beautiful and simple UI ---&gt;
                        </button>
                    </h2>
                    <div id="flush-collapseTwo" className="accordion-collapse collapse" data-bs-parent="#accordionFlushExample2">
                        <div className="accordion-body">Placeholder content for this accordion, which is intended to demonstrate the <code>.accordion-flush</code> class. This is the second item's accordion body. Let's imagine this being filled with some actual content.</div>
                    </div>
                </div>
                <div className="accordion-item bg-transparent">
                    <h2 className="accordion-header">
                        <button className="accordion-button collapsed bg-transparent" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseThree" aria-expanded="false" aria-controls="flush-collapseThree">
                            #3 Theme Toggle option for User ---&gt;
                        </button>
                    </h2>
                    <div id="flush-collapseThree" className="accordion-collapse collapse" data-bs-parent="#accordionFlushExample3">
                        <div className="accordion-body">Placeholder content for this accordion, which is intended to demonstrate the <code>.accordion-flush</code> class. This is the third item's accordion body. Nothing more exciting happening here in terms of content, but just filling up the space to make it look, at least at first glance, a bit more representative of how this would look in a real-world application.</div>
                    </div>
                </div>
            </div>
        </div>
    );
}
