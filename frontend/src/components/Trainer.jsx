import React, { useState, useEffect, Fragment } from "react";
import Header from "./Header";
import Footer from "./Footer";
import { MDBDataTable } from "mdbreact";
import shortId from "shortid";
import Alert from "./Alert";
import axios from "axios";
import { useHistory } from "react-router-dom";

function Trainer({ authorised }) {
  const [toggle, setToggle] = useState(false);
  const [update, setUpdate] = useState(false);
  const [alert, setAlert] = useState(false);
  const [deleteRecord, setDeleteRecord] = useState("");
  const [formErrors, setFormErrors] = useState({});
  const [submit, setSubmit] = useState(false);
  const [success, setSuccess] = useState(false);
  const history = useHistory();
  const [trainers, setTrainers] = useState({
    fullname: "",
    age: "",
    mobile: "",
    package: "",
    salary: "",
  });

  const [trainData, setTrainData] = useState([]);

  const handleToggle = (e) => {
    e.preventDefault();
    setUpdate(false);
    setToggle((prev) => !prev);
    setTrainers({
      fullname: "",
      age: "",
      mobile: "",
      package: "",
      salary: "",
    });
  };

  const handleChange = (e) => {
    const { value, name } = e.target;

    setTrainers((prev) => ({ ...prev, [name]: value }));
  };

  //   //   useEffect(() => {
  //   //     setTrainData()
  //   //   }, [trainData])

  //   const createId = () => {
  //     const Id = shortId.generate();
  //     setNewId(Id);
  //   };

  //handle form errors
  const validateName = (values) => {
    const errors = {};

    console.log(values);
    if (!values) {
      errors.fullname = "full name required!";
    }
    return errors;
  };
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

    if (!values.package) {
      errors.package = "package is required";
    }

    if (!values.salary) {
      errors.salary = "salary is required";
    }

    return errors;
  };

  const getTrainers = async () => {
    try {
      const { data } = await axios.get("http://localhost:4000/trainers");

      console.log(data);
      setTrainData(data.trainers);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getTrainers();
    if (!authorised) {
      history.push("/");
    }

    if (Object.keys(formErrors).length === 0 && submit) {
      setSubmit(true);
    }
  }, [formErrors, authorised]);

  const checkErrors = () => {
    if (!validateName) {
      setSubmit(true);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(validateName(trainers.fullname));

    setFormErrors(validate(trainers));
    setSubmit(true);

    if (update && Object.keys(formErrors).length === 0 && submit) {
      // const newTrainData = trainData.filter((item) => {
      //   return item._id !== trainers._id;
      // });
      try {
        const data = await axios.put(
          `http://localhost:4000/trainers/${trainers._id}`,
          trainers
        );
        getTrainers();
      } catch (error) {
        console.log(error);
      }

      // setTrainData([...newTrainData, trainers]);
      setUpdate(false);
      setToggle(false);
      setTrainers({
        fullname: "",
        age: "",
        mobile: "",
        package: "",
        salary: "",
      });

      setSubmit(false);
    } else {
      // createId();

      // const { fullname, age, mobile, package: packageItem, salary } = trainers;

      console.log(formErrors);
      if (Object.keys(formErrors).length === 0 && submit) {
        try {
          const { data } = await axios.post(
            "http://localhost:4000/trainers/new",
            trainers
          );
          //after successfully creating new member we update our memberData state

          setTrainData((prev) => [...prev, data]);
          //getMembers()
        } catch (error) {
          console.log(error);
        }
        setToggle(false);
        setTrainers({
          fullname: "",
          age: "",
          mobile: "",
          package: "",
          salary: "",
        });

        setSubmit(false);
      }
    }
  };

  const showAlert = (id) => {
    setAlert(true);
    setDeleteRecord(id);
  };

  const handleDelete = async () => {
    const newData = trainData.filter((train) => {
      return train._id !== deleteRecord;
    });
    const data = await axios.delete(
      `http://localhost:4000/trainers/${deleteRecord}`
    );
    setTrainData(newData);

    setAlert(false);
  };

  const handleUpdate = (id) => {
    const newData = trainData.find((train) => {
      return train._id === id;
    });
    setUpdate(true);
    setToggle(true);
    setTrainers(newData);

    console.log(trainers);
  };
  //   console.log(trainData);
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
          label: "Package",
          field: "package",
          sort: "asc",
        },
        {
          label: "Salary",
          field: "salary",
          sort: "asc",
        },
        {
          label: "Actions",
          field: "actions",
        },
      ],
      rows: [],
    };
    trainData.map((item, index) => {
      data.rows.push({
        id: index,
        fullname: item.fullname,
        age: item.age,
        mobile: item.mobile,
        package: item.package,
        salary: `${item.salary}$`,
        actions: (
          <Fragment>
            <span
              style={{ marginRight: "15px", cursor: "pointer", color: "red" }}
            >
              <i
                onClick={() => showAlert(item._id)}
                className="fa fa-trash "
              ></i>
            </span>
            <i
              onClick={() => handleUpdate(item._id)}
              className="fa fa-edit "
              style={{ cursor: "pointer", color: "#aaa2a2" }}
            ></i>
          </Fragment>
        ),
      });
    });
    //I used the shift function to remove the first empty object hardcoded so that the index can start from 1 instead of 0
    // data.rows.shift();

    return data;
  };
  return (
    <div>
      <Header />
      <div className="trainer">
        {alert && <Alert handleDelete={handleDelete} setAlert={setAlert} />}
        <div
          className="form-container"
          style={{ display: toggle ? "block" : "none" }}
        >
          <div className="input-div">
            {update ? <h3>Update Trainer</h3> : <h3>Add Trainer</h3>}

            <form>
              {/* <i onClick={handleToggle} className="fa fa-times-circle "></i> */}

              <div>
                <input
                  type="text"
                  onChange={handleChange}
                  placeholder="Full Name:"
                  name="fullname"
                  value={trainers.fullname}
                  className={formErrors.fullname && " error"}
                  onKeyPress={() =>
                    setFormErrors(validateName(trainers.fullname))
                  }
                />
                <input
                  type="number"
                  onChange={handleChange}
                  placeholder="Age:"
                  value={trainers.age}
                  name="age"
                  className={formErrors.age && " error"}
                />

                <input
                  type="text"
                  onChange={handleChange}
                  placeholder="Mobile Number:"
                  value={trainers.mobile}
                  name="mobile"
                  className={formErrors.mobile && " error"}
                />
                <input
                  placeholder="Package:"
                  onChange={handleChange}
                  type="text"
                  name="package"
                  value={trainers.package}
                  className={formErrors.package && " error"}
                />
                <input
                  type="number"
                  onChange={handleChange}
                  placeholder="Salary:"
                  name="salary"
                  value={trainers.salary}
                  className={formErrors.salary && " error"}
                />
              </div>
              <div className="btn-container">
                <button
                  // style={{ opacity: !submit && 0.2 }}
                  // disabled={true}
                  onClick={handleSubmit}
                >
                  {update ? <span>Update</span> : <span>Add</span>}
                </button>
                <button
                  onClick={handleToggle}
                  style={{ backgroundColor: "red" }}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>

        <div className="add-trainer">
          <h1 className="">Trainers</h1>
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

export default Trainer;
