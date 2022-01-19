import React, { useState } from "react";
import styled from "styled-components";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import { useParams } from "react-router-dom";
import { app } from "../base";
import { useEffect } from "react";
import Personal from "./Personal";

const ImageDetail = ({}) => {
  const { id } = useParams();
  const [data, setData] = useState([]);
  const marks = [
    {
      value: 0,
      label: "0",
    },
    {
      value: 10,
      label: "1",
    },
    {
      value: 20,
      label: "2",
    },
    {
      value: 30,
      label: "3",
    },
    {
      value: 40,
      label: "4",
    },
    {
      value: 50,
      label: "5",
    },
    {
      value: 60,
      label: "6",
    },
    {
      value: 70,
      label: "7",
    },
    {
      value: 80,
      label: "8",
    },
    {
      value: 90,
      label: "9",
    },

    {
      value: 100,
      label: "10",
    },
  ];

  const getDataProfile = async () => {
    await app
      .firestore()
      .collection("post")
      .doc(id)
      .get()
      .then((dataSamp) => {
        setData(dataSamp.data());
      });
  };

  const [valueHolder, setValueHolder] = useState(0);

  const valuetext = (value) => {
    return `${value}°C`;
  };

  useEffect(() => {
    getDataProfile();
  }, []);

  return (
    <Container>
      <Wrapper>
        <div>Choose the degree of Hotness or Notness</div>

        <Slide>
          <Slider
            color="secondary"
            aria-label="Always visible"
            defaultValue={8}
            getAriaValueText={valuetext}
            step={10}
            marks={marks}
            valueLabelDisplay="off"
            onChange={(e) => {
              setValueHolder(e.target.value);
            }}
          />
        </Slide>

        <Vote
          bg="#004080"
          cl="white"
          onClick={() => {
            console.log("show: ", valueHolder);
          }}
        >
          Vote
        </Vote>
        <Holder>
          <Card>
            <Personal who={data?.createdBy} time={data?.createdAt} />
            <MainImage src={data?.yourPix} />
          </Card>
        </Holder>
      </Wrapper>
    </Container>
  );
};

export default ImageDetail;

const Vote = styled.div`
  font-size: 13px;
  text-decoration: none;
  padding: 15px 35px;
  margin: 20px 10px;
  background-color: ${({ bg }) => bg};
  color: ${({ cl }) => cl};
  font-weight: bold;
  border-radius: 3px;
  transition: all 350ms;
  transform: scale(1);
  text-transform: uppercase;

  :hover {
    cursor: pointer;
    transform: scale(1.012);
  }
`;

const Slide = styled.div`
  margin: 10px 0;
  width: 300px;
`;

const MainImage = styled.img`
  width: 100%;
  height: 100%;
  flex: 1;
  background: orange;
  object-fit: cover;
`;

const Detail = styled.div`
  display: flex;
  flex-direction: column;

  padding-left: 10px;
`;
const Time = styled.div``;
const Name = styled.div``;
const Image = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  object-fit: cover;
  background: orange;
`;
const Top = styled.div`
  display: flex;
  align-items: center;
  padding-top: 10px;
  padding-left: 10px;
  margin-bottom: 10px;
`;

const Card = styled.div`
  overflow: hidden;
  box-shadow: rgba(0, 0, 0, 0.02) 0px 1px 3px 0px,
    rgba(27, 31, 35, 0.15) 0px 0px 0px 1px;
  width: 300px;
  height: 400px;
  border-radius: 5px;
`;

const Holder = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
`;

const Wrapper = styled.div`
  padding-top: 100px;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Container = styled.div`
  width: 100%;
  min-height: calc(100vh - 100px);
  height: 100%;
  background: lightgray;
  font-family: Poppins;
`;
