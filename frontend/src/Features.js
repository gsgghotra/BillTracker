import './Features.css';
export default function Features(){
    return(
        <>
            <div className="container-fluid ">
                <h4 className="heading">Upcoming Features</h4>
                <div className="card">
                    <div className="card-body">
                        <ul>
                            <li>Visualize your spending habits with intuitive bill graphs</li>
                            <li>Directly access to websites when bills are due</li>
                            <li>Seamless experience with error tracking</li>
                            <li>More utility providers added regularly</li>
                            <li>Track and visualize your solar panel energy generation</li>
                        </ul>
                    </div>
                </div>
            </div>
        </>
    );
}