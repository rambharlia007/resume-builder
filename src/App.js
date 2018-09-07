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
    this.addCompany = this.addCompany.bind(this);
  }

  addCompany = () => {
    let org = {};
    let orgs = this.state.workExperience;
    orgs.push(org);
    this.setState({ workExperience: orgs });
  };
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
                        <div class="form-group row">
                          <label
                            for="colFormLabelSm"
                            class="col-sm-3 col-form-label col-form-label-sm"
                          >
                            Name
                          </label>
                          <div class="col-sm-9">
                            <input
                              type="email"
                              class="form-control form-control-sm"
                            />
                          </div>
                        </div>
                        <div class="form-group row">
                          <label
                            for="colFormLabelSm"
                            class="col-sm-3 col-form-label col-form-label-sm"
                          >
                            Job Title
                          </label>
                          <div class="col-sm-9">
                            <input
                              type="email"
                              class="form-control form-control-sm"
                            />
                          </div>
                        </div>
                        <div class="form-group row">
                          <label
                            for="colFormLabelSm"
                            class="col-sm-3 col-form-label col-form-label-sm"
                          >
                            Description
                          </label>
                          <div class="col-sm-9">
                            <input
                              type="email"
                              class="form-control form-control-sm"
                            />
                          </div>
                        </div>
                        <div class="form-group row">
                          <label
                            for="colFormLabelSm"
                            class="col-sm-3 col-form-label col-form-label-sm"
                          >
                            Description
                          </label>
                          <div class="col-sm-9">
                            <input
                              type="email"
                              class="form-control form-control-sm"
                            />
                          </div>
                        </div>
                        <div class="form-group row">
                          <label class="col-sm-3 col-form-label col-form-label-sm">
                            Email
                          </label>
                          <div class="col-sm-9">
                            <input class="form-control form-control-sm" />
                          </div>
                        </div>
                        <div class="form-group row">
                          <label class="col-sm-3 col-form-label col-form-label-sm">
                            Phone Number
                          </label>
                          <div class="col-sm-9">
                            <input class="form-control form-control-sm" />
                          </div>
                        </div>
                        <div class="form-group row">
                          <label class="col-sm-3 col-form-label col-form-label-sm">
                            LinkedIn url
                          </label>
                          <div class="col-sm-9">
                            <input class="form-control form-control-sm" />
                          </div>
                        </div>
                        <div class="form-group row">
                          <label class="col-sm-3 col-form-label col-form-label-sm">
                            Skype Id
                          </label>
                          <div class="col-sm-9">
                            <input class="form-control form-control-sm" />
                          </div>
                        </div>
                        <div class="form-group row">
                          <label class="col-sm-3 col-form-label col-form-label-sm">
                            Email
                          </label>
                          <div class="col-sm-9">
                            <input class="form-control form-control-sm" />
                          </div>
                        </div>

                        <div class="form-group row">
                          <label class="col-sm-3 col-form-label col-form-label-sm">
                            Languages
                          </label>
                          <div class="col-sm-9">
                            <select
                              class="form-control form-control-sm"
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
                        </div>
                        <div class="form-group row">
                          <label className="col-sm-3 col-form-label col-form-label-sm">
                            Skills
                          </label>
                          <div class="col-sm-9">
                            <select
                              class="form-control form-control-sm"
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
                          </div>{" "}
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
                <div class="tab-pane" id="profile" role="tabpanel">
                  <button
                    type="button"
                    class="btn btn-secondary btn-sm"
                    onClick={this.addCompany}
                  >
                    Add Company
                  </button>
                  <div id="accordion">
                    {this.state.workExperience.map((value, index) => {
                      return (
                        <div class="card" key={index}>
                          <div class="card-header" id="headingOne">
                            <h5 class="mb-0">
                              <button
                                class="btn btn-link"
                                data-toggle="collapse"
                                data-target="#collapseOne"
                                aria-expanded="true"
                                aria-controls="collapseOne"
                              >
                                Company 1
                              </button>
                            </h5>
                          </div>

                          <div
                            id="collapseOne"
                            class="collapse show"
                            aria-labelledby="headingOne"
                            data-parent="#accordion"
                          >
                            <div class="card-body">
                              <form>
                                <div class="form-group row">
                                  <label
                                    for="colFormLabelSm"
                                    class="col-sm-3 col-form-label col-form-label-sm"
                                  >
                                    Company Name
                                  </label>
                                  <div class="col-sm-9">
                                    <input
                                      type="email"
                                      class="form-control form-control-sm"
                                    />
                                  </div>
                                </div>
                                <div class="form-group row">
                                  <label
                                    for="colFormLabelSm"
                                    class="col-sm-3 col-form-label col-form-label-sm"
                                  >
                                    Title
                                  </label>
                                  <div class="col-sm-9">
                                    <input
                                      type="email"
                                      class="form-control form-control-sm"
                                    />
                                  </div>
                                </div>
                                <div class="form-group row">
                                  <label
                                    for="colFormLabelSm"
                                    class="col-sm-3 col-form-label col-form-label-sm"
                                  >
                                    Location
                                  </label>
                                  <div class="col-sm-9">
                                    <input
                                      type="email"
                                      class="form-control form-control-sm"
                                    />
                                  </div>
                                </div>
                                <div class="form-group row">
                                  <label
                                    for="colFormLabelSm"
                                    class="col-sm-3 col-form-label col-form-label-sm"
                                  >
                                    Date
                                  </label>
                                  <div class="col-sm-9">
                                    <input
                                      type="email"
                                      class="form-control form-control-sm"
                                    />
                                  </div>
                                </div>
                              </form>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
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
