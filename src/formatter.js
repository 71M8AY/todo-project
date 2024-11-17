export function formatter(text) {
  text += "";
  if (text === "Indefinite") {
    return text;
  }
  let arr = text.split("-");
  switch (arr[1]) {
    case "01":
      arr[1] = "Jan";
      break;
    case "02":
      arr[1] = "Feb";
      break;
    case "03":
      arr[1] = "Mar";
      break;
    case "04":
      arr[1] = "Apr";
      break;
    case "05":
      arr[1] = "May";
      break;
    case "06":
      arr[1] = "Jun";
      break;
    case "07":
      arr[1] = "Jul";
      break;
    case "08":
      arr[1] = "Aug";
      break;
    case "09":
      arr[1] = "Sep";
      break;
    case "10":
      arr[1] = "Oct";
      break;
    case "11":
      arr[1] = "Nov";
      break;
    case "12":
      arr[1] = "Dec";
      break;
  }
  [arr[0], arr[2]] = [arr[2], arr[0]];
  return arr.join("-");
}
