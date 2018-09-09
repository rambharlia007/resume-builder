import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import $ from "jquery";
import Popper from "popper.js";
import select2 from "select2";
import bootstrap from "bootstrap";
import "../node_modules/font-awesome/css/font-awesome.css";

import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/select2/dist/css/select2.min.css";

const jsonData = require("./sampleData.json");

const props = [
  "title",
  "name",
  "description",
  "email",
  "phoneNumber",
  "linkedIn",
  "skypeId",
  "languages",
  "skills",
  "location",
  "organisations",
  "honoursAndAwards",
  "education",
  "workExperience"
];

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mainBackGround: "grey-bg",
      isPreviewMode: false,
      tabContentWidth: 6,
      name: "",
      title: "",
      description: "",
      email: "",
      profilePicture: "/images/male.png",
      phoneNumber: "",
      linkedIn: "",
      location: "",
      skypeId: "",
      skills: [],
      languages: [],
      workExperience: [
        {
          name: "company-1",
          position: "",
          location: "",
          date: "",
          description: "* "
        }
      ],
      organisations: [
        {
          name: ""
        }
      ],
      education: [
        {
          collegeName: "",
          Course: "",
          timePeriod: ""
        }
      ],
      honoursAndAwards: [
        {
          challengeName: "",
          title: ""
        }
      ]
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.setTab = this.setTab.bind(this);
    this.addCompany = this.addCompany.bind(this);
  }

  handleUploadImage = () => {};
  clearSampleData = () => {
    props.forEach((data, index) => {
      this.setState({ [data]: "" });
    });
  };
  loadSampleData = () => {
    $(this.refs.s2_lang)
      .select2()
      .val(jsonData.languages)
      .trigger("change");
    $(this.refs.s2_skills)
      .select2()
      .val(jsonData.skills)
      .trigger("change");
    props.forEach((data, index) => {
      this.setState({ [data]: jsonData[data] });
    });
  };

  addCompany = () => {
    let orgs = this.state.workExperience;
    orgs.push({
      name: `company-${orgs.length + 1}`,
      position: "",
      location: "",
      date: "",
      description: "* "
    });
    this.setState({ workExperience: orgs });
  };

  addOrganisation = () => {
    let orgs = this.state.organisations;
    orgs.push({
      name: ""
    });
    this.setState({ organisations: orgs });
  };

  addEducation = () => {
    let orgs = this.state.education;
    orgs.push({
      collegeName: "",
      Course: "",
      timePeriod: ""
    });
    this.setState({ education: orgs });
  };

  addHonoursAndAward = () => {
    let orgs = this.state.honoursAndAwards;
    orgs.push({
      challengeName: "",
      title: ""
    });
    this.setState({ honoursAndAwards: orgs });
  };
  handleInputChange(event) {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;
    this.setState({
      [name]: value
    });
  }
  handleKeyPress = (event, index) => {
    if (event.key === "Enter") {
      const workExperience = { ...this.state.workExperience };
      workExperience[index].description = workExperience[
        index
      ].description.substring(0, workExperience[index].description.length - 1);
      workExperience[index].description += "\n" + "* ";
      this.setState({
        [workExperience]: workExperience
      });
    }
  };
  handleArrayInputChange(event, index, innerData) {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;
    let data = this.state[innerData];
    data[index][name] = value;
    this.setState({
      [innerData]: data
    });
  }

  setTab = value => {
    if (value == "basicInfo") this.setState({ tabContentWidth: 6 });
    else if (value === "projects") this.setState({ tabContentWidth: 9 });
    else if (value === "organisations") this.setState({ tabContentWidth: 9 });
    else if (value === "preview") this.setState({ tabContentWidth: 7 });
    else if (value === "template_preview")
      this.setState({ tabContentWidth: 9 });
    $(this.refs[value]).tab("show");
  };

  setSelect2Component = () => {
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
  };

  setThirdParty() {
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

    $(this.refs.s2_skills).on("change", e => {
      var data = $(this.refs.s2_skills).val();
      this.setState({ skills: data });
    });
    $(".disableEvent").on("contextmenu", function() {
      alert("right click disabled");
      return false;
    });
    $('[data-toggle="tooltip"]').tooltip();
  }

  componentDidMount() {
    this.setThirdParty();
  }
  componentDidUpdate() {
    this.setThirdParty();
  }
  printDiv() {
    window.print();
  }

  readURL = input => {
    this.setState({
      profilePicture: URL.createObjectURL(input.target.files[0])
    });
  };

  render() {
    return (
      <div className="App">
        <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
          <a class="navbar-brand" href="#">
            Resume Builder
          </a>
          <button
            class="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon" />
          </button>
          <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav">
              <li class="nav-item active">
                <a class="nav-link" href="#">
                  Home <span class="sr-only">(current)</span>
                </a>
              </li>
            </ul>
          </div>
        </nav>
        <div className={"container-fluid p15 " + this.state.mainBackGround}>
          <div className="row pb10">
            <div className="col-md-12 nonPrintable">
              {this.state.isPreviewMode && (
                <div>
                  <button
                    class="btn btn-success btn-sm mr10"
                    type="submit"
                    onClick={() => {
                      this.setState({ isPreviewMode: false });
                      this.setState({ mainBackGround: "grey-bg" });
                      this.setSelect2Component();
                    }}
                  >
                    Edit details
                  </button>
                  <button
                    class="btn btn-success btn-sm mr10"
                    type="submit"
                    onClick={() => {
                      this.printDiv();
                    }}
                  >
                    Print resume
                  </button>
                </div>
              )}
            </div>
          </div>
          {this.state.isPreviewMode && (
            <div id="printMe">
              <div class="row">
                <div class="col-md-3 grey-bg">
                  <div className="template-image">
                    <img
                      src={this.state.profilePicture}
                      width="150"
                      height="150"
                      alt="/images/male.png"
                      class="rounded-circle"
                    />
                  </div>
                  <div className="pb10">
                    <p class="font-weight-normal no-m-bottom">
                      <i class="fas fa-envelope def-text-color" />
                      &nbsp; {this.state.email}
                    </p>
                  </div>
                  <div className="pb10">
                    <p class="font-weight-normal no-m-bottom">
                      <i class="fas fa-mobile def-text-color" />
                      &nbsp;
                      {this.state.phoneNumber}
                    </p>
                  </div>
                  <div className="pb10">
                    <p class="font-weight-normal no-m-bottom">
                      <i class="fas fa-map-marker-alt def-text-color" />
                      &nbsp; {this.state.location}
                    </p>
                  </div>
                  <div className="pb10">
                    <p class="font-weight-normal no-m-bottom">
                      <i class="fab fa-linkedin def-text-color" />
                      &nbsp; {this.state.linkedIn}
                    </p>
                  </div>
                  <div className="pb10">
                    <p class="font-weight-normal no-m-bottom">
                      <i class="fab fa-skype def-text-color" /> &nbsp;
                      {this.state.skypeId}
                    </p>
                  </div>
                  <div>
                    <h3 class="def-text-color text-uppercase pt20">Skills</h3>
                    <hr class="no-m-top hr-1" />
                    {this.state.skills.map((value, index) => {
                      return (
                        <React.Fragment>
                          <span class="border rounded skill-padding">
                            {value}
                          </span>{" "}
                          <br />
                        </React.Fragment>
                      );
                    })}
                  </div>
                  <div>
                    <h3 class="def-text-color text-uppercase pt20">
                      Languages
                    </h3>
                    <hr class="no-m-top hr-1" />
                    {this.state.languages.map((value, index) => {
                      return (
                        <React.Fragment>
                          <span class="border rounded skill-padding">
                            {value}
                          </span>{" "}
                          <br />
                        </React.Fragment>
                      );
                    })}
                  </div>
                </div>
                <div class="col-md-9">
                  <div class="card profile">
                    <div class="card-body">
                      <h3 class="card-title profile-text">{this.state.name}</h3>
                      <p class="card-subtitle mb-2 profile-text fs13">
                        {this.state.title}
                      </p>
                      <hr class="no-m-top hr-2" />
                      <p class="card-text profile-text">
                        {this.state.description}
                      </p>
                    </div>
                  </div>
                  <div>
                    <h3 class="def-text-color text-uppercase pt20">
                      Work Experience
                    </h3>
                    <hr class="no-m-top hr-1" />

                    {this.state.workExperience.map((data, index) => {
                      return (
                        <div className="pb20">
                          <h4 class="def-text-color no-m-bottom">
                            {data.name}
                          </h4>
                          <h4 class="no-m-bottom">{data.position}</h4>
                          <p class="font-italic def-text-color no-m-bottom">
                            {data.date}
                            <span className="float-right">{data.location}</span>
                          </p>

                          {data.description
                            .split("*")
                            .map((inData, inIndex) => {
                              if (inData) {
                                return (
                                  <p class="font-weight-normal no-m-bottom">
                                    <span class="def-text-color">
                                      {" "}
                                      &#x25A0;
                                    </span>{" "}
                                    {inData.trim()}
                                  </p>
                                );
                              }
                            })}
                        </div>
                      );
                    })}
                  </div>

                  <div>
                    <h3 class="def-text-color text-uppercase">Organisations</h3>
                    <hr class="no-m-top hr-1" />
                    {this.state.organisations.map((data, index) => {
                      return <p class="font-weight-normal">{data.name}</p>;
                    })}
                  </div>

                  <div>
                    <h3 class="def-text-color text-uppercase">Education</h3>
                    <hr class="no-m-top hr-1" />

                    {this.state.education.map((data, index) => {
                      return (
                        <div className="pb20">
                          <h4 class="def-text-color no-m-bottom">
                            {data.Course}
                          </h4>
                          <h5 class="no-m-bottom">{data.collegeName}</h5>
                          <p class="font-italic def-text-color no-m-bottom">
                            {data.timePeriod}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                  <div>
                    <h3 class="def-text-color text-uppercase">
                      Honours and awards
                    </h3>
                    <hr class="no-m-top hr-1" />

                    {this.state.honoursAndAwards.map((data, index) => {
                      return (
                        <div>
                          <h5 class="no-m-bottom">{data.title}</h5>
                          <p>{data.challengeName}</p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>{" "}
            </div>
          )}

          {!this.state.isPreviewMode && (
            <div className="row nonPrintable">
              <div className="col-md-3">
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
                    ref="projects"
                    href="#profile"
                    role="tab"
                    onClick={e => {
                      this.setTab("projects");
                    }}
                  >
                    Projects
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
                    Organisations and Educations
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
                    Honours And Awards
                  </a>
                </div>

                <div className="row">
                  <div className="col-md-12 pt10">
                    {" "}
                    <button
                      class="btn btn-secondary btn-sm mr10"
                      type="submit"
                      onClick={() => {
                        this.loadSampleData();
                      }}
                    >
                      Load sample resume data
                    </button>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12 pt10">
                    <button
                      class="btn btn-secondary btn-sm mr10"
                      type="submit"
                      onClick={() => {
                        this.clearSampleData();
                      }}
                    >
                      Clear resume data
                    </button>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12 pt10">
                    <button
                      class="btn btn-secondary btn-sm mr10"
                      type="submit"
                      onClick={() => {
                        this.setState({ isPreviewMode: true });
                        this.setState({ mainBackGround: "white-bg" });
                      }}
                    >
                      Resume preview
                    </button>{" "}
                  </div>
                </div>
              </div>
              <div className={"col-md-" + this.state.tabContentWidth}>
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
                                class="form-control form-control-sm"
                                name="name"
                                value={this.state.name}
                                onChange={this.handleInputChange}
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
                                class="form-control form-control-sm"
                                name="title"
                                value={this.state.title}
                                onChange={this.handleInputChange}
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
                                class="form-control form-control-sm"
                                name="description"
                                value={this.state.description}
                                onChange={this.handleInputChange}
                              />
                            </div>
                          </div>
                          <div class="form-group row">
                            <label class="col-sm-3 col-form-label col-form-label-sm">
                              Email
                            </label>
                            <div class="col-sm-9">
                              <input
                                class="form-control form-control-sm"
                                name="email"
                                value={this.state.email}
                                onChange={this.handleInputChange}
                              />
                            </div>
                          </div>
                          <div class="form-group row">
                            <label class="col-sm-3 col-form-label col-form-label-sm">
                              Phone Number
                            </label>
                            <div class="col-sm-9">
                              <input
                                class="form-control form-control-sm"
                                name="phoneNumber"
                                value={this.state.phoneNumber}
                                onChange={this.handleInputChange}
                              />
                            </div>
                          </div>
                          <div class="form-group row">
                            <label class="col-sm-3 col-form-label col-form-label-sm">
                              Profile pic
                            </label>
                            <div class="col-sm-9">
                              <input
                                type="file"
                                class="form-control-file form-control-sm"
                                name="profilePicture"
                                // value={this.state.profilePicture}
                                onChange={event => {
                                  this.readURL(event);
                                }}
                              />
                            </div>
                          </div>
                          <div class="form-group row">
                            <label class="col-sm-3 col-form-label col-form-label-sm">
                              LinkedIn url
                            </label>
                            <div class="col-sm-9">
                              <input
                                class="form-control form-control-sm"
                                name="linkedIn"
                                value={this.state.linkedIn}
                                onChange={this.handleInputChange}
                              />
                            </div>
                          </div>
                          <div class="form-group row">
                            <label class="col-sm-3 col-form-label col-form-label-sm">
                              Skype Id
                            </label>
                            <div class="col-sm-9">
                              <input
                                class="form-control form-control-sm"
                                name="skypeId"
                                value={this.state.skypeId}
                                onChange={this.handleInputChange}
                              />
                            </div>
                          </div>
                          <div class="form-group row">
                            <label class="col-sm-3 col-form-label col-form-label-sm">
                              Location
                            </label>
                            <div class="col-sm-9">
                              <input
                                class="form-control form-control-sm"
                                name="location"
                                value={this.state.location}
                                onChange={this.handleInputChange}
                              />
                            </div>
                          </div>

                          <div class="form-group row">
                            <label class="col-sm-3 col-form-label col-form-label-sm">
                              Languages &nbsp;
                              <i
                                class="fas fa-info-circle"
                                data-toggle="tooltip"
                                data-placement="right"
                                title="If language is not available, please type in the language and hit enter"
                              />
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
                              Skills &nbsp;
                              <i
                                class="fas fa-info-circle"
                                data-toggle="tooltip"
                                data-placement="right"
                                title="If Skill is not available in the list, please type in the skill and hit enter"
                              />
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
                    <div id="accordion-company">
                      {this.state.workExperience.map((value, index) => {
                        return (
                          <div class="card" key={index}>
                            <div class="card-header p0">
                              <h5 class="mb-0">
                                <button
                                  class="btn btn-link"
                                  data-toggle="collapse"
                                  data-target={"#company-" + index}
                                  aria-expanded="true"
                                  aria-controls={"company-" + index}
                                >
                                  {value.name}
                                </button>
                              </h5>
                            </div>

                            <div
                              id={"company-" + index}
                              class="collapse show"
                              aria-labelledby="headingOne"
                              data-parent="#accordion-company"
                            >
                              <div class="card-body">
                                <form>
                                  <div className="row">
                                    <div className="col-md-5">
                                      <div class="form-group row">
                                        <label
                                          for="colFormLabelSm"
                                          class="col-sm-3 col-form-label col-form-label-sm"
                                        >
                                          Company Name
                                        </label>
                                        <div class="col-sm-9">
                                          <input
                                            class="form-control form-control-sm"
                                            name="name"
                                            value={
                                              this.state.workExperience[index]
                                                .name
                                            }
                                            onChange={event => {
                                              this.handleArrayInputChange(
                                                event,
                                                index,
                                                "workExperience"
                                              );
                                            }}
                                          />
                                        </div>
                                      </div>
                                      <div class="form-group row">
                                        <label
                                          for="colFormLabelSm"
                                          class="col-sm-3 col-form-label col-form-label-sm"
                                        >
                                          Position
                                        </label>
                                        <div class="col-sm-9">
                                          <input
                                            type="email"
                                            class="form-control form-control-sm"
                                            name="position"
                                            value={
                                              this.state.workExperience[index]
                                                .position
                                            }
                                            onChange={event => {
                                              this.handleArrayInputChange(
                                                event,
                                                index,
                                                "workExperience"
                                              );
                                            }}
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
                                            name="location"
                                            value={
                                              this.state.workExperience[index]
                                                .location
                                            }
                                            onChange={event => {
                                              this.handleArrayInputChange(
                                                event,
                                                index,
                                                "workExperience"
                                              );
                                            }}
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
                                            name="date"
                                            value={
                                              this.state.workExperience[index]
                                                .date
                                            }
                                            onChange={event => {
                                              this.handleArrayInputChange(
                                                event,
                                                index,
                                                "workExperience"
                                              );
                                            }}
                                          />
                                        </div>
                                      </div>
                                    </div>
                                    <div className="col-md-7">
                                      <div class="form-group row">
                                        <label
                                          for="colFormLabelSm"
                                          class="col-sm-2.5 col-form-label col-form-label-sm"
                                        >
                                          Description
                                        </label>
                                        <div class="col-sm-10">
                                          <textarea
                                            class="form-control form-control-sm min-h"
                                            name="description"
                                            value={
                                              this.state.workExperience[index]
                                                .description
                                            }
                                            onChange={event => {
                                              this.handleArrayInputChange(
                                                event,
                                                index,
                                                "workExperience"
                                              );
                                            }}
                                            onKeyUp={event => {
                                              this.handleKeyPress(event, index);
                                            }}
                                          />
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </form>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                    <button
                      type="button"
                      class="btn btn-link btn-sm"
                      onClick={this.addCompany}
                    >
                      Add Project
                    </button>
                  </div>
                  <div class="tab-pane" id="messages" role="tabpanel">
                    <div class="card">
                      <div class="card-body">
                        <div className="row">
                          <div className="col-md-6">
                            <h5 class="card-title">Organisations</h5>
                            <div class="card">
                              <div class="card-body">
                                <div class="form-group row">
                                  <label
                                    for="colFormLabelSm"
                                    class="col-sm-3 col-form-label col-form-label-sm"
                                  >
                                    Name &nbsp;
                                    <i
                                      class="fas fa-info-circle"
                                      data-toggle="tooltip"
                                      data-placement="right"
                                      title="Example: TCS (March-2015 to April-2016)"
                                    />
                                  </label>
                                  {this.state.organisations.map(
                                    (value, index) => {
                                      return (
                                        <div class="col-sm-12 pt10">
                                          <input
                                            class="form-control form-control-sm"
                                            name="name"
                                            value={
                                              this.state.organisations[index]
                                                .name
                                            }
                                            onChange={event => {
                                              this.handleArrayInputChange(
                                                event,
                                                index,
                                                "organisations"
                                              );
                                            }}
                                          />
                                        </div>
                                      );
                                    }
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="col-md-6">
                            <h5 class="card-title">Educations</h5>
                            <div id="accordion-education">
                              {this.state.education.map((value, index) => {
                                return (
                                  <div class="card pt10" key={index}>
                                    <div class="card-header p0">
                                      <h5 class="mb-0">
                                        <button
                                          class="btn btn-link"
                                          data-toggle="collapse"
                                          data-target={"#education-" + index}
                                          aria-expanded="true"
                                          aria-controls={"education-" + index}
                                        >
                                          {value.name}
                                        </button>
                                      </h5>
                                    </div>
                                    <div
                                      id={"education-" + index}
                                      class="collapse show"
                                      aria-labelledby="headingOne"
                                      data-parent="#accordion-education"
                                    >
                                      <div class="card-body">
                                        <form>
                                          <div class="form-group row">
                                            <label
                                              for="colFormLabelSm"
                                              class="col-sm-3 col-form-label col-form-label-sm"
                                            >
                                              Collage name &nbsp;
                                              <i
                                                class="fas fa-info-circle"
                                                data-toggle="tooltip"
                                                data-placement="right"
                                                title="University Visvesvaraya College Of Engineering"
                                              />
                                            </label>
                                            <div class="col-sm-9">
                                              <input
                                                class="form-control form-control-sm"
                                                name="collegeName"
                                                value={
                                                  this.state.education[index]
                                                    .collegeName
                                                }
                                                onChange={event => {
                                                  this.handleArrayInputChange(
                                                    event,
                                                    index,
                                                    "education"
                                                  );
                                                }}
                                              />
                                            </div>
                                          </div>
                                          <div class="form-group row">
                                            <label
                                              for="colFormLabelSm"
                                              class="col-sm-3 col-form-label col-form-label-sm"
                                            >
                                              Course &nbsp;
                                              <i
                                                class="fas fa-info-circle"
                                                data-toggle="tooltip"
                                                data-placement="right"
                                                title="Example: BE in computer science"
                                              />
                                            </label>
                                            <div class="col-sm-9">
                                              <input
                                                class="form-control form-control-sm"
                                                name="course"
                                                value={
                                                  this.state.education[index]
                                                    .course
                                                }
                                                onChange={event => {
                                                  this.handleArrayInputChange(
                                                    event,
                                                    index,
                                                    "education"
                                                  );
                                                }}
                                              />
                                            </div>
                                          </div>
                                          <div class="form-group row">
                                            <label
                                              for="colFormLabelSm"
                                              class="col-sm-3 col-form-label col-form-label-sm"
                                            >
                                              Period &nbsp;
                                              <i
                                                class="fas fa-info-circle"
                                                data-toggle="tooltip"
                                                data-placement="right"
                                                title="2011-2015"
                                              />
                                            </label>
                                            <div class="col-sm-9">
                                              <input
                                                class="form-control form-control-sm"
                                                name="timePeriod"
                                                value={
                                                  this.state.education[index]
                                                    .timePeriod
                                                }
                                                onChange={event => {
                                                  this.handleArrayInputChange(
                                                    event,
                                                    index,
                                                    "education"
                                                  );
                                                }}
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
                        </div>
                      </div>
                    </div>
                    <button
                      type="button"
                      class="btn btn-link btn-sm"
                      onClick={this.addOrganisation}
                    >
                      Add Organisation
                    </button>
                    <button
                      type="button"
                      class="btn btn-link btn-sm"
                      onClick={this.addEducation}
                    >
                      Add Education
                    </button>
                  </div>
                  <div class="tab-pane" id="settings" role="tabpanel">
                    <h5 class="card-title">Honours and Awards</h5>
                    <div id="accordion-honours_and_awards">
                      {this.state.honoursAndAwards.map((value, index) => {
                        return (
                          <div class="card pt10" key={index}>
                            <div class="card-header p0">
                              <h5 class="mb-0">
                                <button
                                  class="btn btn-link"
                                  data-toggle="collapse"
                                  data-target={
                                    "#accordion-honours_and_awards-" + index
                                  }
                                  aria-expanded="true"
                                  aria-controls={
                                    "accordion-honours_and_awards-" + index
                                  }
                                >
                                  {value.name}
                                </button>
                              </h5>
                            </div>
                            <div
                              id={"accordion-honours_and_awards-" + index}
                              class="collapse show"
                              aria-labelledby="headingOne"
                              data-parent="#accordion-honours_and_awards"
                            >
                              <div class="card-body">
                                <form>
                                  <div class="form-group row">
                                    <label
                                      for="colFormLabelSm"
                                      class="col-sm-3 col-form-label col-form-label-sm"
                                    >
                                      Compitation &nbsp;
                                      <i
                                        class="fas fa-info-circle"
                                        data-toggle="tooltip"
                                        data-placement="right"
                                        title="Example: Hacker rank june coding competation"
                                      />
                                    </label>
                                    <div class="col-sm-9">
                                      <input
                                        class="form-control form-control-sm"
                                        name="challengeName"
                                        value={
                                          this.state.honoursAndAwards[index]
                                            .challengeName
                                        }
                                        onChange={event => {
                                          this.handleArrayInputChange(
                                            event,
                                            index,
                                            "honoursAndAwards"
                                          );
                                        }}
                                      />
                                    </div>
                                  </div>
                                  <div class="form-group row">
                                    <label
                                      for="colFormLabelSm"
                                      class="col-sm-3 col-form-label col-form-label-sm"
                                    >
                                      Winning Title &nbsp;
                                      <i
                                        class="fas fa-info-circle"
                                        data-toggle="tooltip"
                                        data-placement="right"
                                        title="Example: Coder of the month"
                                      />
                                    </label>
                                    <div class="col-sm-9">
                                      <input
                                        class="form-control form-control-sm"
                                        name="title"
                                        value={
                                          this.state.honoursAndAwards[index]
                                            .title
                                        }
                                        onChange={event => {
                                          this.handleArrayInputChange(
                                            event,
                                            index,
                                            "honoursAndAwards"
                                          );
                                        }}
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
                    <button
                      type="button"
                      class="btn btn-link btn-sm"
                      onClick={this.addHonoursAndAward}
                    >
                      Add Honours and Awards
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default App;
