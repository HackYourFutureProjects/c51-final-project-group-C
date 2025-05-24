import alps from "../dummyData/alps.jpg";
import morocco from "../dummyData/morocco.jpg";
import tokyo from "../dummyData/tokyo.jpg";
import santorini from "../dummyData/santorini.jpg";
import fjords from "../dummyData/fjord.jpg";
import newyork from "../dummyData/newyork.jpg";
import egypt from "../dummyData/egypt.jpg";
import amazon from "../dummyData/amazon.jpg";

const travelPlans = [
  {
    ID: 1,
    tripName: "Summer in Santorini",
    creatorName: "Alice Johnson",
    rating: 3,
    numberOfCopies: 12,
    image: santorini,
  },
  {
    ID: 2,
    tripName: "Alps Ski Adventure",
    creatorName: "Mark Thompson",
    rating: 2,
    numberOfCopies: 8,
    image: alps,
  },
  {
    ID: 3,
    tripName: "Tokyo Food Tour",
    creatorName: "Sakura Tanaka",
    rating: 4.5,
    numberOfCopies: 20,
    image: tokyo,
  },
  {
    ID: 4,
    tripName: "Moroccan Desert Escape",
    creatorName: "Youssef El Amrani",
    rating: 2.5,
    numberOfCopies: 9,
    image: morocco,
  },
  {
    ID: 5,
    tripName: "Norwegian Fjord Cruise",
    creatorName: "Ingrid Larsen",
    rating: 4,
    numberOfCopies: 15,
    image: fjords,
  },
  {
    ID: 6,
    tripName: "New York City Lights",
    creatorName: "James Carter",
    rating: 3.5,
    numberOfCopies: 18,
    image: newyork,
  },
  {
    ID: 7,
    tripName: "Amazon Rainforest Trek",
    creatorName: "Lucia Ramirez",
    rating: 5,
    numberOfCopies: 1,
    image: amazon,
  },
  {
    ID: 8,
    tripName: "Egyptian Pyramid Tour",
    creatorName: "Ahmed Nabil",
    rating: 4.5,
    numberOfCopies: 13,
    image: egypt,
  },
];
export default travelPlans;
