import React, { useState, useEffect, Fragment } from "react";
import Header from "./Header";
import Footer from "./Footer";
import { MDBDataTable } from "mdbreact";
import shortId from "shortid";
import Alert from "./Alert";
import axios from "axios";

function Member() {
  const baseURL = "http://localhost:4000";

  const [toggle, setToggle] = useState(false); // for showing the add member popup container
  const [update, setUpdate] = useState(false); // to know when we want to update a post to conditional rendering
  const [alert, setAlert] = useState(false); // alert for delete confirmation
  const [deleteRecord, setDeleteRecord] = useState(""); // storing id of the record to be deleted
  const [formErrors, setFormErrors] = useState({});
  const [submit, setSubmit] = useState(false);
  const [members, setMembers] = useState({
    //member object
    fullname: "",
    age: "",
    mobile: "",
    hightWight: "",
    illness: "",
    package: "",
    payment: "",
    trainer: "",
  });

  const [memberData, setMemberData] = useState([]); // member data object, i added an empty object to able to achieve index from 1 instead of 0

  const handleToggle = () => {
    setUpdate(false);
    setToggle((prev) => !prev);
    // I noticed after update, the input field are not empty, so i empty the input by setting the members object state to empty string
    setMembers({
      fullname: "",
      age: "",
      mobile: "",
      hightWight: "",
      illness: "",
      package: "",
      payment: "",
      trainer: "",
    });
  };

  // x = 10;

  // console.log(x);
  // var x;

  const handleChange = (e) => {
    const { value, name } = e.target;

    setMembers((prev) => ({ ...prev, [name]: value }));
  };

  //handle form errors

  const validate = (values) => {
    const errors = {};

    if (!values.fullname) {
      errors.fullname = "full name required!";
    }

    if (!values.age) {
      errors.age = "age is required!";
    }

    if (!values.mobile) {
      errors.mobile = "mobile is required!";
    }

    if (!values.hightWight) {
      errors.hightWight = "hightWight is required!";
    }

    if (!values.illness) {
      errors.illness = "illness is required";
    }

    if (!values.package) {
      errors.package = "package is required";
    }

    if (!values.payment) {
      errors.payment = "payment is required";
    }

    if (!values.trainer) {
      errors.trainer = "trainer is required";
    }
    return errors;

    // fullname: "",
    // age: "",
    // mobile: "",
    // hightWight: "",
    // illness: "",
    // package: "",
    // payment: "",
    // trainer: "",
  };

  //get members data.

  const getMembers = async () => {
    console.log("p");
    try {
      const { data } = await axios.get("http://localhost:4000/members");
      setMemberData(data.members);
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getMembers();
    console.log("o");
    if (Object.keys(formErrors).length === 0 && submit) {
      setSubmit(true);
    }
  }, [formErrors]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setFormErrors(validate(members));
    setSubmit(true);
    //I use the update state to know when creating a new member or updating the member info
    //the state is initially set to false, but when the icon for update post is clicked,
    //the update state is set to true in updatehandler function

    if (update && Object.keys(formErrors).length === 0 && submit && submit) {
      // //we filter out the old member data using the using the id
      // const oldMemberData = memberData.filter((item) => {
      //   return item._id !== members._id;
      // });
      // // i use the spread operator to update the array passing in the updated members data from the members usestate in updatehandler
      // setMemberData([...oldMemberData, members]);

      try {
        const data = await axios.put(
          `http://localhost:4000/members/${members._id}`,
          members
        );
        getMembers();
      } catch (error) {
        console.log(error);
      }

      //i set back the update state to false so when we want to add new member it will not show update.
      setUpdate(false);

      //i use the toggle to show the add member  popup div container, so i close it by setting togle back to false
      setToggle(false);

      //i empty the inputs by setting the members object to empty
      setMembers({
        fullname: "",
        age: "",
        mobile: "",
        hightWight: "",
        illness: "",
        package: "",
        payment: "",
        trainer: "",
      });

      setSubmit(false);
    } else {
      // setSubmit(true);
      console.log(formErrors);
      if (Object.keys(formErrors).length === 0 && submit) {
        //we send a post req to our backend server

        try {
          const { data } = await axios.post(
            "http://localhost:4000/members/new",
            members
          );
          //after successfully creating new member we update our memberData state

          setMemberData((prev) => [...prev, data]);
          //getMembers()
        } catch (error) {
          console.log(error);
        }

        setToggle(false);
        setMembers({
          fullname: "",
          age: "",
          mobile: "",
          hightWight: "",
          illness: "",
          package: "",
          payment: "",
          trainer: "",
        });

        setSubmit(false);
      }
    }
  };

  const showAlert = (id) => {
    //we use the showalert function to show confirmation alert when
    // the admin want to delete record
    //the pop up alert will be set to true so that the confirm will show
    setAlert(true);
    //i pass the id received from the mdbtable (item.id) to the deleterecord state to store it and wil be used to filter and delete
    //only if the admin click on YES
    setDeleteRecord(id);
  };

  const handleDelete = async () => {
    // when YES is chosen, we then filter out the record and set the memberdata state to the newData
    const newData = memberData.filter((member) => {
      return member._id !== deleteRecord;
    });

    const data = await axios.delete(
      `http://localhost:4000/members/${deleteRecord}`
    );
    setMemberData(newData);

    //we close the confirm pop alert
    setAlert(false);
  };

  const handleUpdate = (id) => {
    // i use the find() to find the member by id which was passed from the mdbtable (item.id)
    const newData = memberData.find((member) => {
      return member._id === id;
    });

    setUpdate(true);
    setToggle(true);
    setMembers(newData);
  };

  const setTable = () => {
    const data = {
      columns: [
        {
          label: "#",
          field: "id",
          sort: "asc",
        },

        {
          label: "Full Name",
          field: "fullname",
          sort: "asc",
        },
        {
          label: "Age",
          field: "age",
          sort: "asc",
        },
        {
          label: "Mobile Number",
          field: "mobile",
          sort: "asc",
        },
        {
          label: "Hight/Wight",
          field: "hightWight",
          sort: "asc",
        },
        {
          label: "Illness",
          field: "illness",
          sort: "asc",
        },
        {
          label: "Package",
          field: "package",
          sort: "asc",
        },
        {
          label: "Payment",
          field: "payment",
          sort: "asc",
        },
        {
          label: "Trainer",
          field: "trainer",
          sort: "asc",
        },
        {
          label: "Actions",
          field: "actions",
        },
      ],
      rows: [],
    };
    memberData.map((item, index) => {
      data.rows.push({
        id: index,
        fullname: item.fullname,
        age: item.age,
        mobile: item.mobile,
        hightWight: item.hightWight,
        illness: item.illness,
        package: item.package,
        payment: `${item.payment}$`, // the backticks ES6 concanation method to add a dollar sign to the amount, thats ${item.payment} and then $
        trainer: item.trainer,
        actions: (
          <Fragment>
            <span
              style={{ marginRight: "15px", cursor: "pointer", color: "red" }}
            >
              <i
                //id of the record passed as params when clicked
                onClick={() => showAlert(item._id)}
                className="fa fa-trash "
              ></i>
            </span>
            <i
              // id will be passed
              onClick={() => handleUpdate(item._id)}
              className="fa fa-edit "
              style={{ cursor: "pointer", color: "#aaa2a2" }}
            ></i>
          </Fragment>
        ),
      });
    });
    //I used the shift function to remove the first empty object hardcoded in the memberData useState({}) so that the index can start from 1 instead of 0
    // data.rows.shift();

    return data;
  };
  return (
    <div>
      <Header />
      <div className="trainer">
        {/* both the setalert and handledelete functions are passed as props */}
        {alert && <Alert handleDelete={handleDelete} setAlert={setAlert} />}
        <div
          className="form-container"
          style={{ display: toggle ? "block" : "none" }}
        >
          <div className=" member-input">
            {/* conditionally render the elements based on the state of update */}
            {update ? <h3>Update Member</h3> : <h3>Add Member</h3>}

            <form>
              <div>
                <input
                  type="text"
                  onChange={handleChange}
                  placeholder="Full Name:"
                  name="fullname"
                  value={members.fullname}
                  className={formErrors.fullname && " error"}
                />

                <input
                  type="number"
                  onChange={handleChange}
                  placeholder="Age:"
                  value={members.age}
                  name="age"
                  className={formErrors.age && " error"}
                />
                {/* <label htmlFor="Mobile Number">Mobile Number</label> */}
                <input
                  type="text"
                  onChange={handleChange}
                  placeholder="Mobile Number:"
                  value={members.mobile}
                  name="mobile"
                  className={formErrors.mobile && " error"}
                />
                <input
                  placeholder="Hight/Wight:"
                  onChange={handleChange}
                  type="text"
                  name="hightWight"
                  value={members.hightWight}
                  className={formErrors.hightWight && " error"}
                />
                <input
                  placeholder="Illness:"
                  onChange={handleChange}
                  type="text"
                  name="illness"
                  value={members.illness}
                  className={formErrors.illness && " error"}
                />
                <input
                  placeholder="Package:"
                  onChange={handleChange}
                  type="text"
                  name="package"
                  value={members.package}
                  className={formErrors.package && " error"}
                />
                <input
                  type="number"
                  onChange={handleChange}
                  placeholder="Payment:"
                  name="payment"
                  value={members.payment}
                  className={formErrors.payment && " error"}
                />
                <input
                  placeholder="Trainer:"
                  onChange={handleChange}
                  type="text"
                  name="trainer"
                  value={members.trainer}
                  className={formErrors.trainer && " error"}
                />
              </div>
            </form>
            <div className="btn-container">
              <button onClick={handleSubmit}>
                {update ? <span>Update</span> : <span>Add</span>}
              </button>
              <button onClick={handleToggle} style={{ backgroundColor: "red" }}>
                Cancel
              </button>
            </div>
          </div>
        </div>

        <div className="add-trainer">
          <h1 className="">Members</h1>
          <button onClick={handleToggle}>Add</button>
        </div>

        <div className="trainer-table">
          <div className="">
            <Fragment>
              <MDBDataTable
                data={setTable()}
                bordered
                striped
                hover
                responsiveSm
              />
            </Fragment>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Member;
