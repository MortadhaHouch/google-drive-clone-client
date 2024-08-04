/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
export default function Dialog(props) {
    return (
        <section className={`popup ${props.isShown?"shown":"hidden"}`}>
            <div>
                {
                    props.edit && (
                        <form action="" method="post">
                            <div>
                                <label htmlFor="firstName">first name</label>
                                <input type="text" name="firstName" placeholder="firstName" className="form-control" id="" />
                            </div>
                            <div>
                                <label htmlFor="lastName">last name</label>
                                <input type="text" name="lastName" placeholder="lastName" className="form-control" id="" />
                            </div>
                            <div>
                                <label htmlFor="password">password</label>
                                <input type="text" name="password" placeholder="password" className="form-control" id="" />
                            </div>
                            <button className="btn btn-info">Confirm</button>
                        </form>
                    )
                }
                {
                    props.createFolder && (
                        <form action="" method="post">
                            <div>
                                <label htmlFor="folderName">folder name</label>
                                <input type="text" name="folderName" placeholder="folder name" className="form-control" id="" />
                            </div>
                            <button className="btn btn-info">Confirm</button>
                        </form>
                    )
                }
                {
                    props.createFile && (
                        <form action="" method="post">
                            <div>
                                <label htmlFor="fileName">file name</label>
                                <input type="text" name="folderName" placeholder="folderName" className="form-control" id="" />
                            </div>
                            <button className="btn btn-info">Confirm</button>
                        </form>
                    )
                }
            </div>
        </section>
    )
}
