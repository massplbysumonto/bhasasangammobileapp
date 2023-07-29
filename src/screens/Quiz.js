import React, { Component } from "react";
import { AsyncStorage,View, Text , StyleSheet,SafeAreaView,TextInput,TouchableOpacity,Alert,StatusBar,ScrollView } from 'react-native'
import { Avatar, Button, Card, Title, Paragraph } from 'react-native-paper';
import { Link } from '@react-navigation/native';
// import './Quiz.css';
// import QuizSolution from '../components/QuizSolution';
// import { NavLink } from 'react-router-dom';
// import { Modal, Button } from 'react-bootstrap'

class Quiz extends Component {
    constructor(props) {
        super(props);
        //  const question=props.state.questions;
        // console.log(props.gameAttr.eventID);
        this.QuizData = props.gameAttr.game_attr;

        for (let i = 0; i < this.QuizData.length; i++) {
            this.QuizData[i].selectedAnswer = "";
            this.QuizData[i].score = 0;
        }
        //  console.log(this.QuizData);

    }


    state = {
        userAnswer: "",
        currentIndex: 0,
        options: [],
        quizEnd: false,
        score: 0,
        nextdisabled: true,
        prevdisabled: false,
        prevAnswer: null,
        flip: false,
        active: false,
        status: false,
        artifactStatus: false,
        artifact: ""
    }

    //Component that holds the current quiz
    loadQuiz = () => {
        // const {currentIndex} = this.state //get the current question index
        this.setState(() => {
            return {
                question: this.QuizData[this.state.currentIndex].questions,
                options: this.QuizData[this.state.currentIndex].options,
                answer: this.QuizData[this.state.currentIndex].answers
            }
        }
        )
    }
    handleToggle = () => {
        const { isPasswordHidden } = this.state;
      
        if (isPasswordHidden) {
          this.setState({ isPasswordHidden: false });
          this.setState({ toggleText: 'Hide' });
        } else {
          this.setState({ isPasswordHidden: true });
          this.setState({ toggleText: 'Show' });
        }
      };
    nextQuestionHanlder = () => {
        // console.log("hello");
        const { currentIndex,flip } = this.state;
        
        this.setState({currentIndex: currentIndex + 1});
        // flip not working
        // var flipvalue = !flip
        // // // this.setState({userAnswer: null});
        // this.setState({flip: flipvalue});
        // console.log(flipvalue)
    }

    prevQuestionHandler = () => {
        // const {answer, score ,flip} =this.state
        this.setState({
            currentIndex: this.state.currentIndex - 1,
            // flip: !this.state.flip
        })


    }

    componentDidMount() {
        this.loadQuiz()
    }

    //Check the answer
    checkAnswer = (Answer) => {
        // alert("hello");
        this.QuizData[this.state.currentIndex].selectedAnswer = Answer;
        // console.log(this.QuizData[this.state.currentIndex].selectedAnswer);
        const current_score = 0;
        this.setState({
            // userAnswer: Answer,
            nextdisabled: false
        })
        // console.log(this.state)
        // console.log(this.state.answer)
        if (this.QuizData[this.state.currentIndex].score === 0) {
            if (this.QuizData[this.state.currentIndex].selectedAnswer === this.state.answer) {
                this.setState({
                    score: this.state.score + 1
                })
                this.QuizData[this.state.currentIndex].score = 1;
            }
        }
    }

    componentDidUpdate(prevProps, prevState) {
        const { currentIndex } = this.state;
        if (this.state.currentIndex !== prevState.currentIndex) {
            this.setState(() => {
                return {
                    question: this.QuizData[currentIndex].questions,
                    options: this.QuizData[currentIndex].options,
                    answer: this.QuizData[currentIndex].answers,
                }
            });
        }
    }

    // finishHandler = () => {
    //     var answerStatus = JSON.parse(AsyncStorage.getItem('events'));
    //     this.setState({
    //         status: answerStatus[this.props.gameAttr.eventID][0].tile_game_info[this.props.gameAttr.gameID].game_answer_status
    //     });

    //     if (this.state.currentIndex === this.QuizData.length - 1) {
    //         this.setState({
    //             quizEnd: true
    //         })
    //     }
    //     // console.log(this.props.gameAttr.eventType);
    // }
    // solutionHandler = (data) => {
    //     this.setState({
    //         active: true
    //     });
    //     if (data === false) {
    //         this.setState({
    //             active: false
    //         });
    //     }
    //     // if(this.state.active==false){
    //     //     alert("Options is blocked by admin!!!")
    //     // }
    //     // console.log(this.state.active)
    // }
    // eventStatusArray = async(artifact) => {//
    //     artifact[this.props.gameAttr.eventID][0].tile_game_info[this.props.gameAttr.gameID].game_status = 1;
    //     var currentArtifacts1= await AsyncStorage.getItem('artifactList');
    //     var currentArtifacts= JSON.parse(currentArtifacts1);
    //     var date = new Date;
    //     var artifact_url =  artifact[this.props.gameAttr.eventID][0].tile_game_info[this.props.gameAttr.gameID].game_artifact.artifact_prev;
    //     var artifact_name= artifact[this.props.gameAttr.eventID][0].tile_game_info[this.props.gameAttr.gameID].game_artifact.artifact_name
    //     var artifactInfo={artifact_type:0,artifact_url:artifact_url,artifact_name:artifact_name,activityName: artifact[this.props.gameAttr.eventID][0].tile_game_info[this.props.gameAttr.gameID].game_name,eventName: artifact[this.props.gameAttr.eventID][0].tile_desc,date:date}
    //     if(currentArtifacts==null)
    //     {
    //         currentArtifacts=[];
    //         currentArtifacts.push(artifactInfo);
    //         await AsyncStorage.setItem("artifactList",JSON.stringify(currentArtifacts));
    //     }
    //     else
    //     {
    //         currentArtifacts=JSON.parse(currentArtifacts);
    //         for(let i=0;i<currentArtifacts.length;i++)
    //         {
    //             if(currentArtifacts[i].activityName===artifact[this.props.gameAttr.eventID][0].tile_game_info[this.props.gameAttr.gameID].game_name) return artifact
    //         }
    //         currentArtifacts.push(artifactInfo);
    //         await AsyncStorage.setItem("artifactList",JSON.stringify(currentArtifacts));
    //     }
    //     return artifact;
    // }
    // storagehandler = async() => {
    //     var eventData1 = await AsyncStorage.getItem('events');
    //     var eventData= JSON.parse(eventData1);
    //     // console.log(eventData);
    //     const newEventsData = this.eventStatusArray(eventData);
    //    await AsyncStorage.setItem("events", JSON.stringify(newEventsData));
    // }
    // artifactHandler = async() => {
    //     var artifact1 = await AsyncStorage.getItem('events');
    //     var artifact= JSON.parse(artifact1);
    //     this.setState({
    //         artifact: artifact[this.props.gameAttr.eventID][0].tile_game_info[this.props.gameAttr.gameID].game_artifact.artifact_prev,
    //         artifactStatus: true
    //     });
    // }
    changeHandler = () => {
        this.setState({
            artifactStatus: false
        });
        // console.log(this.state.active)
    }
    styles= StyleSheet.create({
        full:{
             display: "flex",
             justifyContent: "center",
             flexDirection: "column",
             alignItems: "center"
         },
         hint:{
            padding: 10,
            height: 40        
        },
        selected :{
            backgroundColor: "#573329",
            color: "white",
            marginVertical:5,
            padding: 20,
            width: 300,
             borderRadius: 25,
             fontWeight: "bold",textAlign: "center",
        },
        options :{
            padding: 20,
            marginVertical:5,
            backgroundColor: "#E6DDD0",
            width: 300,
            borderRadius: 25,
            fontWeight: "bold",
            textAlign: "center",
        },
        li:{
             margin:".5% auto",
             padding: "8px",
             backgroundColor: "#E6DDD0",
             width: "30%",
             borderRadius: "25px",
             fontWeight: "bold",
            display: "flex",     
            justifyContent: "center",
             
        },
        optionList:{
            paddingTop: "2%",
        
        },
        body:{
            fontFamily: "Verdana",
            fontSize: "15px",
            color:"#573329 !important"
        } ,
        cardd:{
            width:350,
            borderRadius:9,
            paddingTop:20,
            // boxShadow: "0 0 5px 2px rgba(0, 0, 0, .3)",
            // transition: "transform .8s",
            // transformStyle: "preserve-3d",
            height: 400,
            // margin: "1% auto",
            // backgroundColor: "#E6DDD0" 
            backgroundColor:"#fbf8f4"
          
        },
        flip: {
            /* --rotate-y: 180deg; */
            transform: "rotateY(180deg)"
        },
        question:{
            
            // left:"2%",
            paddingTop: 3,
            color: "#573329",
        },
        quiz:{
            textAlign: "center",
            justifyContent: "center",
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
            backfaceVisibility: "hidden"
            /* transition: transform .8s; */
            
        },
       flip1:{
            transform: "rotateY(-180deg)"
        }
     })
    render() {
        const { question, userAnswer, options, currentIndex, quizEnd, flip } = this.state;
        // if (quizEnd) {
        //     return (
        //         <> <div>
        //             <h1>Game Over. Final score is {this.state.score} points</h1>
        //             <div style={{ width: "40%", margin: "0 auto", padding: "1%", borderRadius: "15px", border: "2px solid rgba(0,0,0,0.2)" }}>
        //                 <h4>Activity Outcome</h4>
        //                 <div style={{ backgroundColor: "aliceblue", height: "100px", borderRadius: "10px" }}>
        //                     <p>{this.props.gameAttr.outcome.outcome_desc}</p>
        //                 </div>
        //             </div>
        //             <div>
        //                 {
        //                     this.state.status &&
        //                     <button onClick={this.solutionHandler} style={{ borderRadius: "10px", padding: ".5%", border: "none", backgroundColor: "#573329", margin: "1% 5% 0px", color: "white" }}>Correct Answers</button>
        //                 }
        //                 <button onClick={this.artifactHandler} style={{ borderRadius: "10px", padding: ".5%", border: "none", backgroundColor: "#573329", margin: "1% 5% 0px", color: "white" }}>Collect Artifact</button>
        //                 <NavLink
        //                     to="/activityBoard" state={{ eventIndex: this.props.gameAttr.eventID }}>
        //                     <button onClick={this.storagehandler} style={{ borderRadius: "10px", padding: ".5%", border: "none", backgroundColor: "#573329", margin: "1% 5% 0px", color: "white" }}>Go To HomePage</button>
        //                 </NavLink>
        //                 <div>
        //                     {
        //                         this.state.artifactStatus === true &&
        //                         // <h1>hello</h1>
        //                         <Modal
        //                             show={this.state.artifactStatus}
        //                             onHide={this.changeHandler}
        //                             size="lg"
        //                             aria-labelledby="contained-modal-title-vcenter"
        //                             centered
        //                         >
        //                             <Modal.Header closeButton>
        //                                 <Modal.Title id="contained-modal-title-vcenter">
        //                                     Artifact Collection
        //                                 </Modal.Title>
        //                             </Modal.Header>
        //                             <Modal.Body>
        //                                 <div>
        //                                     <h3>New Artifact to your collection</h3>
        //                                     <img style={{ width: "400px" }} src={"http://localhost:8000/getImage/?imgName=" + this.state.artifact}></img>
        //                                 </div>
        //                             </Modal.Body>
        //                             <Modal.Footer>
        //                                 <Button onClick={this.changeHandler}>Close</Button>
        //                             </Modal.Footer>
        //                         </Modal>
        //                     }
        //                 </div>
        //             </div>
        //             <div>
        //                 {
        //                     this.state.active &&
        //                     <QuizSolution show={this.state.active} data={this.solutionHandler} value={this.QuizData} score={this.state.score} />
        //                     // &&
        //                     // alert("blocked!!")
        //                 }
        //             </div>
        //         </div>
        //         </>
        //     )
        // } 
        return (
            <>


           
             <View style={this.styles.full}>
             <View style={{width: "100%", flexDirection: 'row', justifyContent: 'flex-end', alignItems: "center", marginBottom: 10,}}>
    

    <View style={{width: "50%", borderRadius: 8, flexDirection:"row",borderColor:"rgba(87, 51, 41,1)",borderWidth:1,}}>
              <Text style={{textAlign: "center", width: "60%",lineHeight: 28,fontSize: 11,}}>Selected Language:</Text>
              <Text style={{lineHeight: 28,fontSize: 12,width: "40%", backgroundColor: "rgba(87, 51, 41,1)", borderTopRightRadius: 7, borderBottomRightRadius: 7, color: "rgba(255, 255, 255,1)", textAlign: "center",
               }}>{this.props.gameData[this.props.id].lang.lang_desc}</Text>
              {/* <Text>{this.props.gameData[this.props.id].lang.lang_desc}</Text>  */}
    </View>          
</View>
                  <View style={flip ? this.styles.flip : this.styles.cardd}>
                        <View style={flip ? this.styles.flip1 : this.styles.quiz}> 
                            <Text style={this.styles.question}>{question}</Text>
                            <View style={this.styles.hint}>
                                {this.QuizData[currentIndex].selectedAnswer != "" &&

                                    <Text style={{ color: "#573329" }}>Your selected answer:<Text style={{ color: "green" }}>{this.QuizData[currentIndex].selectedAnswer}</Text></Text>}
                            </View>
                            {
                                options.map((option, i) =>
                                <TouchableOpacity onPress={()=>this.checkAnswer(option)}>
                                    <Text key={i}  style={this.QuizData[currentIndex].selectedAnswer=== option? this.styles.selected : this.styles.options}>
                                        {option}
                                    </Text>
                                    </TouchableOpacity>
                                )
                            }

                        </View>
                    </View>
                    <View>
                    {(currentIndex > 0) ?
                            (<TouchableOpacity onPress={()=>this.prevQuestionHandler()}><Text>Prev</Text></TouchableOpacity>)
                            : (<Button disabled ><Text>Prev1</Text></Button>)}

                        {(currentIndex < this.QuizData.length - 1) ?
                            (<TouchableOpacity onPress={()=>this.nextQuestionHanlder()}><Text>Next</Text></TouchableOpacity>)
                            : (<Button disabled><Text>Next1</Text></Button>)}
                    
                        {(currentIndex === this.QuizData.length - 1 && this.props.eventType ==2) &&
                         <Link to={{screen:"activityBoard", params:{ eventIndex: this.props.eventID,id:this.props.id }}}>    
                           <Button><Text>Finish</Text></Button>
                        </Link>
                        
                        }
                        {/* {(currentIndex === this.QuizData.length - 1 && this.props.gameAttr.eventType==1) &&
                        
                        <Button onClick={this.finishHandler} ><Text>Finish1</Text></Button>
                        } */}
                    </View>
            </View> 

            </>
        )

    }
}

export default Quiz;