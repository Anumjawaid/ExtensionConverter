import { useState, useEffect } from "react";
import axios from "axios";

const contribute = () => {
  const [contribution, setContribution] = useState({});
  const [values, setValues] = useState({
    firstName: "",
    lastName: "",
    dob: "",
    type: false,
    status: true,
    story: "",
  });

  const { slug } = router.query;
  // console.log(slug)


  useEffect(() => {
    slug && getContribution();
  }, [slug]);

  useEffect(() => {
    contribution && updateForm(contribution);
  }, [contribution, values]);

  const getContribution = async () => {
    try  {
    const {data} = await axios.get(`/api/contribution/${slug}`);
    const fields = ['firstName', 'lastName', 'dob', 'type', 'status', 'story'];
    fields.forEach(field => setValues({...values, field : data[field]}));
    // setUser(user);

     setContribution(data); 
    }
    catch (err) {
      console.log(err.response.data.error)
      toast(err.response.data.error)}
  };

  const updateForm = async (contribution) => {
    try  {
    // const {data} = await axios.get(`/api/contribution/${slug}`);
    const fields = ['firstName', 'lastName', 'dob', 'type', 'status', 'story'];
    // console.log(contribution);
    fields.forEach(field => setValues({...values, field : contribution[field]}));
    //fields.forEach(field => console.log(field, contribution[field]));
    // // setUser(user);

    //  setContribution(data); 
    }
    catch (err) {
      console.log(err.response.data.error)
      toast(err.response.data.error)}
  };



  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(values.dob)
    try {
      // console.log(values);
      const { data } = await axios.post(`/api/contribution/create/${slug}`, {
        ...values, //spread values
      });
      toast("Story submitted!");
      router.push("/");
    } catch (err) {
      toast(err.response.data);
    }
  };

  return (
    <div style={{ margin: "4rem" }}>
      {JSON.stringify(values.firstName)}
      <form className={`${atoms.form} ${forms.addContentForm}`}>
        <div>
          <input
            className={atoms.input}
            type="text"
            name="first-name"
            value={values.firstName}
            onChange={(e) =>
              setValues({ ...values, firstName: e.target.value })
            }
            placeholder="First name"
            required
          />
          <input
            className={atoms.input}
            type="test"
            name="last-name"
            value={contribution ? contribution.lastName : values.lastName}
            onChange={(e) => setValues({ ...values, lastName: e.target.value })}
            placeholder="Last name"
            required
          />
        </div>
        <label htmlFor="date" className={atoms.label}>
          Date of birth
        </label>
        <input
          className={atoms.input}
          type="date"
          name="date-of-birth"
          value={contribution ? handleDate(contribution.dob) : values.dob }
          onChange={(e) => setValues({ ...values, dob: e.target.value })}
          required
        />
        <select
          className={atoms.input}
          name="type"
          value={contribution ? contribution.type : values.type}
          onChange={(e) => setValues({ ...values, type: e.target.value })}
          required
        >
          <option>-- Select a type --</option>
          <option value="person">Person</option>
          <option value="animal">Animal</option>
        </select>
        <select
          className={atoms.input}
          name="status"
          value={contribution ? contribution.status : values.status}
          onChange={(e) => setValues({ ...values, status: e.target.value })}
          required
        >
          <option>-- Select a status --</option>
          <option value="in-memory">In Memory</option>
          <option value="missing">Missing</option>
          <option value="heroes">Heroes</option>
          <option value="our-lives-now">Our lives now</option>
        </select>
        <label
          style={{
            backgroundColor: "transparent",
            color: "black",
            border: "1px solid black",
          }}
          className={atoms.button}
        >
          {uploadButtonText}
          <input
            type="file"
            name="image"
            onChange={handleImage}
            accept="image/*"
            hidden
          />
        </label>

        <textarea
          className={atoms.textarea}
          name="story"
          value={contribution ? contribution.story : values.story}
          onChange={(e) => setValues({ ...values, story: e.target.value })}
          placeholder="Story..."
          rows={5}
          required
        />
        <button className={atoms.button} type="submit" onClick={handleSubmit}>
          {contribution ? "Edit" : "Add"}
        </button>
      </form>
    </div>
  );
};

export default withRouter(contribute);
