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
import _ from "lodash";
import axios from "axios";
import ReactFileReader from "react-file-reader";

var fileDownload = require("js-file-download");

let jsonData = {}; // require("./sampleData.json");

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

const steps = {
  start: 0,
  template: 1,
  basicInfo: 2,
  projects: 3,
  organisation: 4,
  education: 5,
  honorAndAwards: 6
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = this.getState();
    this.handleInputChange = this.handleInputChange.bind(this);
    this.addCompany = this.addCompany.bind(this);
  }

  getState() {
    return {
      currentStepTitle: "How do you want to start?",
      isThirdPartSet: false,
      currentStep: steps.start,
      isRandomDataPreview: false,
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
          name: "",
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
      ],
      template: [
        { id: 1, src: "/images/template1.png", active: false, activeClass: "" },
        {
          id: 2,
          src: "/images/template2.png",
          active: false,
          activeClass: "disable-template "
        },
        {
          id: 3,
          src: "/images/template3.png",
          active: false,
          activeClass: "disable-template "
        }
      ]
    };
  }

  selectTemplateHandler = index => {
    const tempData = this.state.template;
    tempData.forEach((data, index) => {
      data.active = false;
      tempData[index].activeClass = index == 0 ? "" : "disable-template";
    });
    tempData[index].active = true;
    tempData[index].activeClass = "active-template";
    this.setState({ template: tempData });
  };

  handleUploadImage = () => {};
  clearSampleData = () => {
    let currentState = this.state.currentStep;
    this.setState(this.getState());
    if (currentState === steps.start)
      this.setState({ currentState: steps.template });
    else this.setState({ currentState: currentState });
  };
  loadSampleData = () => {
    props.forEach((data, index) => {
      this.setState({ [data]: jsonData[data] });
    });

    this.saveInDb();
    this.setState({ isPreviewMode: true });
    this.setState({ mainBackGround: "white-bg" });
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
    this.setState({ isThirdPartSet: false });
    this.setState({ currentStep: value });
    if (value == steps.start) {
      this.setState({ currentStepTitle: "How do you want to start?" });
    } else if (value == steps.template) {
      this.setState({ currentStepTitle: "Select template" });
    } else if (value == steps.basicInfo) {
      this.setState({ currentStepTitle: "Basic Info" });
    } else if (value === steps.projects)
      this.setState({ currentStepTitle: "Work Experience" });
    else if (value === steps.organisation)
      this.setState({ currentStepTitle: "Organisations" });
    else if (value === steps.education)
      this.setState({ currentStepTitle: "Education" });
    else if (value === steps.honorAndAwards)
      this.setState({ currentStepTitle: "Honours and Awards" });
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
    // $(".disableEvent").on("contextmenu", function() {
    //   alert("right click disabled");
    //   return true;
    // });
  }

  initialiseToolTip() {
    $('[data-toggle="tooltip"]').tooltip();
  }

  updateVisitCount = () => {
    axios
      .post("https://resume-builder-api.herokuapp.com/visit")
      .then(function(response) {
        console.log(response.data.count);
      })
      .catch(function(error) {
        console.log(error);
      });
  };
  componentDidMount() {
    //this.updateVisitCount();
    this.setThirdParty();
  }
  componentDidUpdate() {
    if (
      this.state.currentStep === steps.basicInfo &&
      !this.state.isThirdPartSet
    ) {
      this.setState({ isThirdPartSet: true });
      this.setThirdParty();
    }
    this.initialiseToolTip();
  }
  printDiv() {
    window.print();
  }

  readURL = input => {
    this.setState({
      profilePicture: URL.createObjectURL(input.target.files[0])
    });
  };

  downloadFile = () => {
    let fileData = {};
    props.forEach((data, index) => {
      fileData[data] = this.state[data];
    });
    fileDownload(JSON.stringify(fileData), `${this.state.name}.json`);
  };

  handleFiles = e => {
    let file = e.target.files[0];
    let fileReader = new FileReader();
    fileReader.onloadend = e => {
      const content = fileReader.result;
      jsonData = JSON.parse(content);
      this.loadSampleData();
    };
    fileReader.readAsText(file);
  };

  saveInDb = () => {
    if (this.state.email && this.state.phoneNumber) {
      let resume = {
        data: JSON.stringify(this.state)
      };
      axios
        .post("https://resume-builder-api.herokuapp.com/resume", resume)
        .then(function(response) {
          console.log("success");
        })
        .catch(function(error) {
          console.log(error);
        });
    }
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
                      if (this.state.currentStep === steps.start) {
                        this.setState({ currentStep: steps.template });
                        this.setState({ currentStepTitle: "Select template" });
                      }
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
                  {this.state.email && (
                    <div className="pb10">
                      <p class="font-weight-normal no-m-bottom">
                        <i class="fas fa-envelope def-text-color" />
                        &nbsp; {this.state.email}
                      </p>
                    </div>
                  )}
                  {this.state.phoneNumber && (
                    <div className="pb10">
                      <p class="font-weight-normal no-m-bottom">
                        <i class="fas fa-mobile def-text-color" />
                        &nbsp;
                        {this.state.phoneNumber}
                      </p>
                    </div>
                  )}
                  {this.state.location && (
                    <div className="pb10">
                      <p class="font-weight-normal no-m-bottom">
                        <i class="fas fa-map-marker-alt def-text-color" />
                        &nbsp; {this.state.location}
                      </p>
                    </div>
                  )}
                  {this.state.linkedIn && (
                    <div className="pb10">
                      <p class="font-weight-normal no-m-bottom">
                        <i class="fab fa-linkedin def-text-color" />
                        &nbsp; {this.state.linkedIn}
                      </p>
                    </div>
                  )}
                  {this.state.skypeId && (
                    <div className="pb10">
                      <p class="font-weight-normal no-m-bottom">
                        <i class="fab fa-skype def-text-color" /> &nbsp;
                        {this.state.skypeId}
                      </p>
                    </div>
                  )}
                  {!_.isEmpty(this.state.skills) && (
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
                  )}
                  {!_.isEmpty(this.state.languages) && (
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
                  )}
                </div>
                <div class="col-md-9">
                  {this.state.name && (
                    <div class="card profile">
                      <div class="card-body">
                        <h3 class="card-title profile-text">
                          {this.state.name}
                        </h3>
                        {this.state.title && (
                          <p class="card-subtitle mb-2 profile-text fs13">
                            {this.state.title}
                          </p>
                        )}
                        {this.state.description && (
                          <React.Fragment>
                            <hr class="no-m-top hr-2" />
                            <p class="card-text profile-text">
                              {this.state.description}
                            </p>{" "}
                          </React.Fragment>
                        )}
                      </div>
                    </div>
                  )}
                  {this.state.workExperience[0].name && (
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
                              <span className="float-right">
                                {data.location}
                              </span>
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
                  )}

                  {this.state.organisations[0].name && (
                    <div>
                      <h3 class="def-text-color text-uppercase">
                        Organisations
                      </h3>
                      <hr class="no-m-top hr-1" />
                      {this.state.organisations.map((data, index) => {
                        return <p class="font-weight-normal">{data.name}</p>;
                      })}
                    </div>
                  )}

                  {this.state.education[0].collegeName && (
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
                  )}
                  {this.state.honoursAndAwards[0].challengeName && (
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
                  )}
                </div>
              </div>{" "}
            </div>
          )}

          {!this.state.isPreviewMode && (
            <div className="nonPrintable">
              <div className="row">
                <div className="col-md-6 offset-md-3 tac">
                  <h5>{this.state.currentStepTitle}</h5>
                </div>
              </div>
              <div className="row">
                <div className="col-md-3">
                  <div class="card">
                    <div class="card-body">
                      <h5 class="card-title def-text-color">
                        About single page resume builder
                      </h5>
                      <p class="card-text italic">
                        Create your resume in minutes using our free single page
                        resume builder. Build the perfect resume and get the job
                        you deserve! <br /> <br />
                        <h5> How to use single page resume buildler </h5> *
                        Select the available templates <br /> * fill in the
                        basic info, work experience, organisations, education,
                        Honours and Awards sections <br /> * click on the
                        preview button to see how your resume looks <br /> *
                        download the file and use next time to save time filling
                        the form again <br />* In preview mode, click on the
                        print button and change the settings to save the file in
                        pfd format and click on save. <br /> <br />{" "}
                        <h5>Filling the form every time is boring ? </h5> * for
                        the first time when the form is filled, you can download
                        the file which is in the json format <br /> * make sure
                        you keep this file in some safe location, or upload in
                        the drive <br /> * now you can upload the json file in
                        the resume builder and all the form contents will
                        prefill automatically. <br /> * click on the preview
                        button to see how your resume looks, <br /> * In preview
                        mode, click on the print button and change the settings
                        to save the file in pfd format and click on save.
                      </p>
                    </div>
                  </div>
                </div>
                <div className={"col-md-" + this.state.tabContentWidth}>
                  {this.state.currentStep === steps.template && (
                    <div>
                      <div className="row justify-content-md-center mh500">
                        <div className="col-md-12">
                          <ul
                            class="nav nav-tabs pb5"
                            id="myTab"
                            role="tablist"
                          >
                            <li class="nav-item">
                              <a
                                class="nav-link active"
                                id="home-tab"
                                data-toggle="tab"
                                href="#home"
                                role="tab"
                                aria-controls="home"
                                aria-selected="true"
                              >
                                Template 1
                              </a>
                            </li>
                            <li class="nav-item">
                              <a
                                class="nav-link"
                                id="profile-tab"
                                data-toggle="tab"
                                href="#profile"
                                role="tab"
                                aria-controls="profile"
                                aria-selected="false"
                              >
                                Template 2
                              </a>
                            </li>
                            <li class="nav-item">
                              <a
                                class="nav-link"
                                id="contact-tab"
                                data-toggle="tab"
                                href="#contact"
                                role="tab"
                                aria-controls="contact"
                                aria-selected="false"
                              >
                                Template 3
                              </a>
                            </li>
                          </ul>
                          <div class="tab-content" id="myTabContent">
                            <div
                              class="tab-pane fade show active"
                              id="home"
                              role="tabpanel"
                              aria-labelledby="home-tab"
                            >
                              <img
                                width="100%"
                                height="550"
                                src={this.state.template[0].src}
                                class={this.state.template[0].activeClass}
                                onClick={() => {
                                  this.selectTemplateHandler(1);
                                }}
                              />
                            </div>
                            <div
                              class="tab-pane fade"
                              id="profile"
                              role="tabpanel"
                              aria-labelledby="profile-tab"
                            >
                              <img
                                width="100%"
                                height="550"
                                src={this.state.template[1].src}
                                class={this.state.template[1].activeClass}
                                onClick={() => {
                                  this.selectTemplateHandler(1);
                                }}
                              />
                            </div>
                            <div
                              class="tab-pane fade"
                              id="contact"
                              role="tabpanel"
                              aria-labelledby="contact-tab"
                            >
                              <img
                                width="100%"
                                height="550"
                                src={this.state.template[2].src}
                                class={this.state.template[2].activeClass}
                                onClick={() => {
                                  this.selectTemplateHandler(1);
                                }}
                              />
                            </div>
                          </div>
                        </div>
                        {/* {this.state.template.map((image, index) => {
                          return (
                            <div class="col-md-8">
                              <img
                                width="85%"
                                height="85%"
                                src={image.src}
                                class={image.activeClass}
                                onClick={() => {
                                  this.selectTemplateHandler(index);
                                }}
                              />
                            </div>
                          );
                        })} */}
                      </div>{" "}
                    </div>
                  )}

                  {this.state.currentStep === steps.start && (
                    <div class="card">
                      <div class="card-body">
                        <div className="row">
                          <div className="col-md-6">
                            <div class="card">
                              <div class="card-body">
                                <div className="tac">
                                  <i class="far fa-file-alt fa-5x pb10" />
                                </div>
                                <h5 className="tac">Create a new resume</h5>
                                <p class="card-text tac">
                                  we will help you create a resume step-by-step
                                </p>
                                <div className="tac">
                                  <button
                                    type="button"
                                    class="btn btn-success btn-sm mr10"
                                    onClick={() => {
                                      this.setTab(1);
                                    }}
                                  >
                                    Create new
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div class="card">
                              <div class="card-body">
                                <div className="tac">
                                  <i class="fas fa-cloud-upload-alt fa-5x pb10" />
                                </div>
                                <h5 className="tac">
                                  Upload existing json file
                                </h5>
                                <p class="card-text tac">
                                  we will read the data for you, so you don't
                                  have to fill the information
                                </p>
                                <div className="tac">
                                  <label class="btn-bs-file btn btn-sm btn-success">
                                    Upload file
                                    <input
                                      type="file"
                                      onChange={event => {
                                        this.handleFiles(event);
                                      }}
                                    />
                                  </label>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {this.state.currentStep === steps.basicInfo && (
                    <div>
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
                                  placeholder="Full stack developer"
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
                              </label>{" "}
                              <div class="col-sm-9">
                                <textarea
                                  class="form-control form-control-sm"
                                  placeholder="Full stack develper with 8 years of experience."
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
                      </div>{" "}
                    </div>
                  )}

                  {this.state.currentStep === steps.projects && (
                    <div>
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
                                      <div className="col-md-12">
                                        <div class="form-group row">
                                          <label
                                            for="colFormLabelSm"
                                            class="col-sm-3 col-form-label col-form-label-sm"
                                          >
                                            Project
                                          </label>
                                          <div class="col-sm-9">
                                            <input
                                              class="form-control form-control-sm"
                                              placeholder="UML generator"
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
                                            Role
                                          </label>
                                          <div class="col-sm-9">
                                            <input
                                              type="text"
                                              class="form-control form-control-sm"
                                              placeholder="Full stack developer"
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
                                              placeholder="Bengaluru, India"
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
                                            Period
                                          </label>
                                          <div class="col-sm-9">
                                            <input
                                              type="email"
                                              class="form-control form-control-sm"
                                              name="date"
                                              placeholder="jan 2018 - march 2018"
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

                                        <div class="form-group row">
                                          <label
                                            for="colFormLabelSm"
                                            class="col-sm-3 col-form-label col-form-label-sm"
                                          >
                                            Description &nbsp;
                                            <i
                                              class="fas fa-info-circle"
                                              data-toggle="tooltip"
                                              data-placement="right"
                                              title="make sure each point starts with * symbol,  hit enter to add new points"
                                            />
                                          </label>
                                          <div class="col-sm-9">
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
                                                this.handleKeyPress(
                                                  event,
                                                  index
                                                );
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
                  )}

                  {this.state.currentStep === steps.organisation && (
                    <div>
                      <div className="row">
                        <div className="col-md-12">
                          <div class="card">
                            <div class="card-body">
                              <div class="form-group row">
                                <label
                                  for="colFormLabelSm"
                                  class="col-sm-3 col-form-label col-form-label-sm"
                                >
                                  Name
                                </label>
                                {this.state.organisations.map(
                                  (value, index) => {
                                    return (
                                      <div class="col-sm-12 pt10">
                                        <input
                                          class="form-control form-control-sm"
                                          placeholder="TCS (March-2015 to April-2016)"
                                          name="name"
                                          value={
                                            this.state.organisations[index].name
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
                      </div>
                      <button
                        type="button"
                        class="btn btn-link btn-sm"
                        onClick={this.addOrganisation}
                      >
                        Add Organisation
                      </button>
                    </div>
                  )}

                  {this.state.currentStep === steps.education && (
                    <div>
                      <div className="row">
                        <div className="col-md-12">
                          <div id="accordion-education">
                            {this.state.education.map((value, index) => {
                              return (
                                <div class="card" key={index}>
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
                                            University &nbsp;
                                          </label>
                                          <div class="col-sm-9">
                                            <input
                                              class="form-control form-control-sm"
                                              placeholder="University Visvesvaraya College Of Engineering"
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
                                          </label>
                                          <div class="col-sm-9">
                                            <input
                                              class="form-control form-control-sm"
                                              placeholder="BE in computer science"
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
                                          </label>
                                          <div class="col-sm-9">
                                            <input
                                              class="form-control form-control-sm"
                                              placeholder="2011-2015"
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
                      <button
                        type="button"
                        class="btn btn-link btn-sm"
                        onClick={this.addEducation}
                      >
                        Add Education
                      </button>
                    </div>
                  )}
                  {this.state.currentStep === steps.honorAndAwards && (
                    <div>
                      <div id="accordion-honours_and_awards">
                        {this.state.honoursAndAwards.map((value, index) => {
                          return (
                            <div class="card" key={index}>
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
                                        Competition &nbsp;
                                      </label>
                                      <div class="col-sm-9">
                                        <input
                                          class="form-control form-control-sm"
                                          placeholder="Hacker rank june coding competition"
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
                                      </label>
                                      <div class="col-sm-9">
                                        <input
                                          class="form-control form-control-sm"
                                          placeholder="Coder of the month"
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
                  )}

                  <div className="row pt10">
                    <div className="col-md-12">
                      {/* <input
                        type="file"
                        class="form-control-file form-control-sm"
                        onChange={event => {
                          this.handleFiles(event);
                        }}
                      /> */}

                      {this.state.currentStep !== steps.start && (
                        <div>
                          {this.state.currentStep !== steps.template &&
                            this.state.currentStep !== steps.basicInfo && (
                              <div>
                                <button
                                  type="button"
                                  class="btn btn-success btn-sm float-right"
                                  onClick={() => {
                                    this.setState({ isPreviewMode: true });
                                    this.setState({
                                      mainBackGround: "white-bg"
                                    });
                                    this.saveInDb();
                                  }}
                                >
                                  Resume Preview
                                </button>
                                <button
                                  type="button"
                                  class="btn btn-success btn-sm float-right mr10"
                                  onClick={() => {
                                    this.downloadFile();
                                    this.saveInDb();
                                  }}
                                >
                                  Download file &nbsp;
                                  <i
                                    class="fas fa-info-circle cw"
                                    data-toggle="tooltip"
                                    data-placement="right"
                                    title="Download the json file and upload the file next time so that it prefills the form data automatically."
                                  />
                                </button>
                              </div>
                            )}
                          {this.state.currentStep !== steps.template && (
                            <button
                              type="button"
                              class="btn btn-success btn-sm mr10"
                              onClick={() => {
                                this.setTab(this.state.currentStep - 1);
                              }}
                            >
                              Previous
                            </button>
                          )}
                          {this.state.currentStep !== steps.honorAndAwards && (
                            <button
                              type="button"
                              class="btn btn-success btn-sm mr10"
                              onClick={() => {
                                this.setTab(this.state.currentStep + 1);
                              }}
                            >
                              Next
                            </button>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="col-md-3">
                  <div class="card">
                    <div class="card-body">
                      <h5 class="card-title def-text-color">
                        Wanna Buy Me A Coffee?
                      </h5>
                      <p class="card-text italic">
                        If you like the free resume builder web app and would
                        like to donate, then you can pay via PayTm | Google pay|
                        PhonePe to 8792092047. <br />
                        Paypal link paypal.me/RamBharlia
                        <br /> <br />
                        Please feel free to write for any suggestion at
                        rambharlia007@gmail.com
                      </p>
                    </div>
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
