export function ConvertCount(Count) {
  if (!Count) return "";
  if (Count < 1000) {
    return Count.toString();
  }
  if (Count < 10000) {
    return (Math.floor(Count / 100) / 10).toString().replace(".", ",") + " N";
  }
  if (Count < 1000000) {
    return Math.floor(Count / 1000).toString() + " N";
  }
  if (Count < 10000000) {
    return (
      (Math.floor(Count / 100000) / 10).toString().replace(".", ",") + " Tr"
    );
  }
  if (Count < 1000000000) {
    return Math.floor(Count / 1000000).toString() + " Tr";
  }
  return (
    (Math.floor(Count / 100000000) / 10).toString().replace(".", ",") + " T"
  );
}
export function ConvertSub(Count) {
  if (!Count) return "";
  if (Count < 1000) {
    return Count.toString();
  }
  if (Count < 10000) {
    return (Math.floor(Count / 10) / 100).toString().replace(".", ",") + " N";
  }
  if (Count < 100000) {
    return (Math.floor(Count / 100) / 10).toString().replace(".", ",") + " N";
  }
  if (Count < 1000000) {
    return Math.floor(Count / 1000).toString() + " N";
  }
  if (Count < 10000000) {
    return (
      (Math.floor(Count / 10000) / 100).toString().replace(".", ",") + " Tr"
    );
  }
  if (Count < 100000000) {
    return (
      (Math.floor(Count / 100000) / 10).toString().replace(".", ",") + " Tr"
    );
  }
  if (Count < 10000000) {
    return (
      (Math.floor(Count / 100000) / 10).toString().replace(".", ",") + " Tr"
    );
  }
  if (Count < 1000000000) {
    return Math.floor(Count / 1000000).toString() + " Tr";
  }
  return (
    (Math.floor(Count / 100000000) / 10).toString().replace(".", ",") + " T"
  );
}
export function ConvertTime(publicTime) {
  if (!publicTime) {
    return;
  }
  const [Pdate, Ptime] = publicTime?.split("T");
  const Current = new Date();
  const [pYear, pMonth, pDay] = Pdate.split("-").map((d) => {
    return parseInt(d);
  });
  const [pHour, pMinute, pSecond] = Ptime.substring(0, 8)
    .split(":")
    .map((d) => {
      return parseInt(d);
    });
  const pTime = new Date(
    Date.UTC(pYear, pMonth - 1, pDay, pHour, pMinute, pSecond)
  );
  const Subtime = ((Current.getTime() - pTime.getTime()) / 1000).toFixed();
  if (Subtime < 60) {
    return Subtime.toString() + " giây trước";
  } else if (Subtime < 3600) {
    return (Subtime / 60).toFixed().toString() + " phút trước";
  } else if (Subtime < 86400) {
    return (Subtime / 3600).toFixed().toString() + " giờ trước";
  } else if (Subtime < 2592000) {
    return (Subtime / 86400).toFixed().toString() + " ngày trước";
  } else if (Subtime < 31536000) {
    return (Subtime / 2592000).toFixed().toString() + " tháng trước";
  } else return (Subtime / 31536000).toFixed().toString() + " năm trước";
}

export function parseDuration(duration) {
  var matches = duration.match(/[0-9]+[HMSD]/g);
  var d, h, m, s;
  matches.forEach(function (part) {
    var unit = part.charAt(part.length - 1);
    var amount = parseInt(part.slice(0, -1));

    switch (unit) {
      case "D":
        d = amount;
      case "H":
        h = amount;
      case "M":
        m = amount;
      case "S":
        s = amount;
      default:
      // noop
    }
  });
  h = d ? d * 24 + h : h;
  return (
    (h ? h.toString() + ":" : "") +
    (h
      ? m
        ? String("0" + m).slice(-2) + ":"
        : "00:"
      : m
      ? m.toString() + ":"
      : "0:") +
    (s ? String("0" + s + " ").slice(-3) : "00 ")
  );
}
export function addDot(x) {
  var parts = x.toString().split(".");
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  return parts.join(",");
}

export function getMD(publicTime) {
  if (!publicTime) {
    return;
  }
  const [Pdate, Ptime] = publicTime?.split("T");
  const [pYear, pMonth, pDay] = Pdate.split("-").map((d) => {
    return parseInt(d);
  });
  return pDay.toString() + " thg " + pMonth;
}
export function getYear(publicTime) {
  if (!publicTime) {
    return;
  }
  const [Pdate, Ptime] = publicTime?.split("T");
  const [pYear, pMonth, pDay] = Pdate.split("-").map((d) => {
    return parseInt(d);
  });
  return pYear;
}
