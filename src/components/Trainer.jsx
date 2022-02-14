import React, { useState, useEffect, Fragment } from "react";
import Header from "./Header";
import Footer from "./Footer";
import { MDBDataTable } from "mdbreact";
import shortId from "shortid";
import Alert from "./Alert";

const tests = [
  {
    id: 1,
    fullname: "Amobi Sam",
    age: 23,
    mobile: "08137507598",
    package: "Novel",
    salary: 200,
  },
  {
    id: 2,
    fullname: "Izie Ify",
    age: 35,
    mobile: "08173807598",
    package: "Rice",
    salary: 700,
  },
  {
    id: 3,
    fullname: "Kingt Eze",
    age: 38,
    mobile: "08155807598",
    package: "Bread",
    salary: 800,
  },
  {
    id: 4,
    fullname: "Innocent Ezie",
    age: 14,
    mobile: "08134807598",
    package: "Books",
    salary: 200,
  },
];

function Trainer() {
  const [toggle, setToggle] = useState(false);
  //   const [newId, setNewId] = useState("");
  const [update, setUpdate] = useState(false);

  const [alert, setAlert] = useState(false);

  const [deleteRecord, setDeleteRecord] = useState("");

  const [trainers, setTrainers] = useState({
    fullname: "",
    age: "",
    mobile: "",
    package: "",
    salary: "",
  });

  const [trainData, setTrainData] = useState([{}]);

  const handleToggle = () => {
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

  const handleSubmit = (e) => {
    e.preventDefault();

    if (update) {
      const newTrainData = trainData.filter((item) => {
        return item.id !== trainers.id;
      });
      setTrainData([...newTrainData, trainers]);
      setUpdate(false);
      setToggle(false);
      setTrainers({
        fullname: "",
        age: "",
        mobile: "",
        package: "",
        salary: "",
      });
    } else {
      // createId();

      // const { fullname, age, mobile, package: packageItem, salary } = trainers;

      const Id = shortId.generate();

      setTrainData((prev) => [...prev, { ...trainers, id: Id }]);
      setToggle(false);
      setTrainers({
        fullname: "",
        age: "",
        mobile: "",
        package: "",
        salary: "",
      });
    }
  };

  const showAlert = (id) => {
    setAlert(true);
    setDeleteRecord(id);
  };

  const handleDelete = () => {
    const newData = trainData.filter((train) => {
      return train.id !== deleteRecord;
    });

    setTrainData(newData);

    setAlert(false);
  };

  const handleUpdate = (id) => {
    const newData = trainData.find((train) => {
      return train.id === id;
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
                onClick={() => showAlert(item.id)}
                className="fa fa-trash "
              ></i>
            </span>
            <i
              onClick={() => handleUpdate(item.id)}
              className="fa fa-edit "
              style={{ cursor: "pointer", color: "#aaa2a2" }}
            ></i>
          </Fragment>
        ),
      });
    });
    //I used the shift function to remove the first empty object hardcoded so that the index can start from 1 instead of 0
    data.rows.shift();

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
                  required
                />
                <input
                  type="number"
                  onChange={handleChange}
                  placeholder="Age:"
                  value={trainers.age}
                  name="age"
                  required
                />
                {/* <label htmlFor="Mobile Number">Mobile Number</label> */}
                <input
                  type="text"
                  onChange={handleChange}
                  placeholder="Mobile Number:"
                  value={trainers.mobile}
                  name="mobile"
                  required
                />
                <input
                  placeholder="package:"
                  onChange={handleChange}
                  type="text"
                  name="package"
                  value={trainers.package}
                  required
                />
                <input
                  type="number"
                  onChange={handleChange}
                  placeholder="Salary:"
                  name="salary"
                  value={trainers.salary}
                  required
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
