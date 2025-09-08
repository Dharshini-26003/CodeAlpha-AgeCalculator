function calculateAge() {
  const dobInput = document.getElementById("dob").value;
  if (!dobInput) {
    alert("Please select your Date of Birth!");
    return;
  }

  const dob = new Date(dobInput);
  const today = new Date();

  // Age calculation
  let years = today.getFullYear() - dob.getFullYear();
  let months = today.getMonth() - dob.getMonth();
  let days = today.getDate() - dob.getDate();

  if (days < 0) {
    months--;
    days += new Date(today.getFullYear(), today.getMonth(), 0).getDate();
  }
  if (months < 0) {
    years--;
    months += 12;
  }

  // Next birthday
  let nextBirthday = new Date(today.getFullYear(), dob.getMonth(), dob.getDate());
  if (today > nextBirthday) {
    nextBirthday.setFullYear(today.getFullYear() + 1);
  }
  const diffTime = nextBirthday - today;
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  // Zodiac sign
  const zodiac = getZodiacSign(dob.getDate(), dob.getMonth() + 1);

  // Day of week born
  const daysOfWeek = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
  const bornDay = daysOfWeek[dob.getDay()];

  // Display result
  document.getElementById("result").innerHTML = `
    <p><b>Exact Age:</b> ${years} years, ${months} months, ${days} days</p>
    <p><b>Next Birthday:</b> In ${diffDays} days 🎂</p>
    <p><b>Zodiac Sign:</b> ${zodiac}</p>
    <p><b>Born on:</b> ${bornDay}</p>
  `;
}

function getZodiacSign(day, month) {
  const signs = [
    { sign: "Capricorn", from: [12, 22], to: [1, 19] },
    { sign: "Aquarius", from: [1, 20], to: [2, 18] },
    { sign: "Pisces", from: [2, 19], to: [3, 20] },
    { sign: "Aries", from: [3, 21], to: [4, 19] },
    { sign: "Taurus", from: [4, 20], to: [5, 20] },
    { sign: "Gemini", from: [5, 21], to: [6, 20] },
    { sign: "Cancer", from: [6, 21], to: [7, 22] },
    { sign: "Leo", from: [7, 23], to: [8, 22] },
    { sign: "Virgo", from: [8, 23], to: [9, 22] },
    { sign: "Libra", from: [9, 23], to: [10, 22] },
    { sign: "Scorpio", from: [10, 23], to: [11, 21] },
    { sign: "Sagittarius", from: [11, 22], to: [12, 21] },
  ];

  for (let s of signs) {
    if (
      (month === s.from[0] && day >= s.from[1]) ||
      (month === s.to[0] && day <= s.to[1])
    ) {
      return s.sign;
    }
  }
  return "Unknown";
}
