import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import $ from "jquery";
import Popper from "popper.js";
import select2 from "select2";
import bootstrap from "bootstrap";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      title: "",
      description: "",
      email: "",
      phoneNumber: "",
      linkedIn: "",
      location: "",
      skypeId: "",
      skills: [],
      languages: [],
      workExperience: [{}],
      organisations: [],
      education: [{}],
      honoursAndAwards: [{}]
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.setTab = this.setTab.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;

    console.log(value);

    this.setState({
      [name]: value
    });
  }

  setTab = value => {
    //e.preventDefault();
    $(this.refs[value]).tab("show");
  };
  componentDidMount() {
    $(this.refs.s2_lang).select2({
      multiple: "multiple",
      tags: true,
      tokenSeparators: [",", " "]
    });

    $(this.refs.s2_skills).select2({
      multiple: "multiple",
      tags: true,
      tokenSeparators: [",", " "]
    });

    $(this.refs.s2_lang).on("change", e => {
      var data = $(this.refs.s2_lang).val();
      this.setState({ languages: data });
    });
  }

  render() {
    return (
      <div className="App">
        <div className="container-fluid p15 grey-bg">
          <div className="row justify-content-md-center">
            <div className="col-md-2">
              <div class="list-group" id="myList" role="tablist">
                <a
                  class="list-group-item list-group-item-action active"
                  ref="basicInfo"
                  href="#home"
                  role="tab"
                  onClick={e => {
                    this.setTab("basicInfo");
                  }}
                >
                  Basic Info
                </a>
                <a
                  class="list-group-item list-group-item-action"
                  ref="workExperience"
                  href="#profile"
                  role="tab"
                  onClick={e => {
                    this.setTab("workExperience");
                  }}
                >
                  Work Experience
                </a>
                <a
                  class="list-group-item list-group-item-action"
                  ref="organisations"
                  href="#messages"
                  role="tab"
                  onClick={e => {
                    this.setTab("organisations");
                  }}
                >
                  Organisations
                </a>
                <a
                  class="list-group-item list-group-item-action"
                  ref="preview"
                  href="#settings"
                  role="tab"
                  onClick={e => {
                    this.setTab("preview");
                  }}
                >
                  Preview
                </a>
              </div>
            </div>
            <div className="col-md-6">
              <div class="tab-content">
                <div class="tab-pane active" id="home" role="tabpanel">
                  <div class="card">
                    <div class="card-body">
                      <form>
                        <div class="form-group">
                          <label>Name</label>
                          <input type="text" class="form-control" />
                        </div>
                        <div class="form-group">
                          <label>Job Title</label>
                          <input type="text" class="form-control" />
                        </div>
                        <div class="form-group">
                          <label>Description</label>
                          <input type="textarea" class="form-control" />
                        </div>
                        <div class="form-group">
                          <label>Email</label>
                          <input type="email" class="form-control" />
                        </div>
                        <div class="form-group">
                          <label>Phone Number</label>
                          <input type="text" class="form-control" />
                        </div>
                        <div class="form-group">
                          <label>LinkedIn url</label>
                          <input type="text" class="form-control" />
                        </div>
                        <div class="form-group">
                          <label>Skype Id</label>
                          <input
                            type="text"
                            class="form-control"
                            name="skypeId"
                            value={this.state.skypeId}
                            onChange={this.handleInputChange}
                          />
                        </div>
                        <div class="form-group">
                          <label>Languages</label>
                          <select
                            ref="s2_lang"
                            multiple={true}
                            class="form-control"
                            value={this.state.languages}
                            onChange={this.handleInputChange}
                          >
                            <option value="English">English</option>
                            <option value="Hindi">Hindi</option>
                            <option value="Kannada">Kannada</option>
                            <option value="Tamil">Tamil</option>
                            <option value="Telugu">Telugu</option>
                            <option value="Malayalam">Malayalam</option>
                          </select>
                        </div>
                        <div class="form-group">
                          <label>Skills</label>
                          <select
                            ref="s2_skills"
                            multiple={true}
                            class="form-control"
                            value={this.state.skills}
                            onChange={this.handleInputChange}
                          >
                            <option value="Dotnet">Dotnet</option>
                            <option value="c#">c#</option>
                            <option value="Java">Java</option>
                            <option value="Entity Framework">
                              Entity Framework
                            </option>
                            <option value="Angular">Angular</option>
                            <option value="React">React</option>
                          </select>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
                <div class="tab-pane" id="profile" role="tabpanel" />
                <div class="tab-pane" id="messages" role="tabpanel">
                  ...
                </div>
                <div class="tab-pane" id="settings" role="tabpanel">
                  ...
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
