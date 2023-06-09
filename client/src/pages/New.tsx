import React,{useState} from "react";
import styled from "styled-components";
import CreatableSelect from "react-select/creatable";
import { useNavigate } from "react-router-dom";
import { Note, Notes } from "../states/types";
import { Tags } from "../states/types";
import { useCreateNotesMutation } from "../states/State";

const Container = styled.div`
  width: 90%;
  min-height: 100vh;
  display: flex;
  /* outline:1px solid black; */
  flex-direction: column;
  gap: 20px;
`;
const Items = styled.div`
  /* outline:1px solid red; */
`;
const Input = styled.input`
  height: 30px;
  border: 1.5px solid gainsboro;
  border-radius: 3px;
`;
const TextArea = styled.textarea`
  height: 400px;
  width: 99.5%;
  border: 1.5px solid gainsboro;
  border-radius: 3px;
`;
const Label = styled.label`
  font-size: 20px;
  font-style: italic;
  font-weight: bold;
`;
const H1 = styled.h1``;
const Button = styled.button`
  height: 30px;
  width: 60px;
  border: 1.5px solid gainsboro;
  cursor: pointer;
  color: #000;
  background-color: inherit;
  border-radius: 3px;
`;
const BtnGroup = styled.div`
  display: flex;
  margin-top: 10px;
  margin-bottom: 50px;
  gap: 10px;
  width: 100%;
  justify-content: flex-end;
`;
const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 40%;
`;
interface Props {}
const userId = `643e6ff79dfacbfd301ca8f4`
const New = (props: Props) => {
 
  const [title, settitle] = useState <HTMLInputElement | Notes["title"] > (``)
  const [body, setbody] = useState <HTMLTextAreaElement | Notes["body"] > (``)
  const [tags, settags] = useState<Array<Tags>> ([])
const  [createNotes]  = useCreateNotesMutation()

  const  addNote= async ()=>{
  const resp = await createNotes( {userId,title, body,tags  })
  }

 
  
  const navigate = useNavigate();
  const cancelBtn = () => {
    navigate("/");
  };
  return (
    <Container>
      <H1>Add new Note</H1>
      <Items
        style={{
          display: "flex",
          alignItems: "center",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <InputWrapper>
          <Label>Title</Label>
          <Input type="text" placeholder="Title" onChange={(e)=>settitle(e.target.value)} />
        </InputWrapper>
        <InputWrapper>
          <Label>Tags</Label>
          <CreatableSelect isMulti 
        
          
          value={tags.map((tag)=>( { label:tag.label, value:tag.value } ))}


          onChange={(tag)=>{
           settags( 
            tag.map((tag)=>( { label:tag.label, value:tag.value}) ))
          }}

          />
        </InputWrapper>
      </Items>
      <Items>
        <InputWrapper style={{ width: "100%" }}>
          <Label>Body</Label>
          <TextArea onChange={(e)=>setbody(e.target.value)} ></TextArea>
        </InputWrapper>
        <BtnGroup>
          <Button style={{ color: "#fff", backgroundColor: "#0d6efd" }} onClick={addNote} >
            save
          </Button>
          <Button onClick={cancelBtn}>cancel</Button>
        </BtnGroup>
      </Items>
    </Container>
  );
};

export default New;
