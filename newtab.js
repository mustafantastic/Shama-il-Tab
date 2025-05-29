// List of images to use as backgrounds
const images = [
  'images/haram1.jpg',
  'images/haram2.jpg',
  'images/haram3.jpg',
  'images/haram4.jpg',
  'images/madina1.jpg',
  'images/madina2.jpg',
  'images/madina3.jpg',
  'images/madina4.jpg',
  'images/madina5.jpg',
  'images/madina6.jpg',
  'images/madina7.jpg',
  'images/madina8.jpg',
  'images/madina10.jpg',
  'images/madina11.jpg',
  'images/mecca1.jpg',
  'images/mecca2.jpg',
  'images/mecca3.jpg',
  'images/mecca4.jpg',
  'images/mecca5.jpg',
  'images/mecca6.jpg',
  'images/mecca7.jpg',
  'images/mecca9.jpg',
  'images/mecca11.jpg'
];

// Set a random background image
const randomImage = images[Math.floor(Math.random() * images.length)];
document.body.style.backgroundImage = `url(${randomImage})`;
document.body.style.backgroundSize = 'cover';
document.body.style.backgroundPosition = 'center';
document.body.style.backgroundRepeat = 'no-repeat';
document.body.style.backgroundAttachment = 'fixed';

//  Filter out these hadith numbers for clarity and conciseness
const excludedHadithNumbers = [
  "20", "30", "35", "47", "59", "64", "73", "101", "103", "111", "112", "119", "126",
  "155", "158", "165", "167", "180", "186", "191", "208", "211", "213", "221",
  "230", "233", "234", "240", "241", "244", "245", "251", "257", "271", "275",
  "284", "310", "326", "332", "337", "358", "368", "374", "377", "387", "401",
  "402", "405", "410", "413", "415", "416", "417",
  "107", "218", "242"
];

// Load and display a filtered random hadith
fetch('shamail.json')
  .then(response => response.json())
  .then(data => {
    const maxChars = 800; //  Character limit

    //  Filter out excluded hadiths and those over the character limit
    const filteredHadiths = data.filter(h => {
      const hadithNum = h.hadithNumber.split(",")[0].trim(); // just the first one
      if (excludedHadithNumbers.includes(hadithNum)) return false;
    
      const englishHadith = h.hadith.find(hd => hd.lang === 'en');
      const plainText = englishHadith?.body?.replace(/<[^>]*>?/gm, '') || '';
    
      return plainText.length <= maxChars;
    });
    
    if (filteredHadiths.length === 0) {
      document.getElementById('hadith').innerText = 'No hadiths available.';
      return;
    }

    const randomHadith = filteredHadiths[Math.floor(Math.random() * filteredHadiths.length)];
    const englishHadith = randomHadith.hadith.find(h => h.lang === 'en');

    const text = englishHadith?.body?.replace(/<[^>]*>?/gm, '') || 'No text available.';
    const refNumber = randomHadith.reference?.hadith || randomHadith.hadithNumber;
    const referenceText = `Ash-Shama'il Al-Muhammadiyah ${refNumber}`;

    document.getElementById('hadith').innerText = text;

    const referenceLink = document.getElementById('reference');
    referenceLink.innerText = referenceText;
    const firstRefNumber = refNumber.split(",")[0].trim();
    referenceLink.href = `https://sunnah.com/shamail:${firstRefNumber}`;
    referenceLink.target = '_blank';
  })
  .catch(error => {
    console.error("❌ Failed to load hadith:", error);
    document.getElementById("hadith").innerText = "Failed to load hadith.";
  });
