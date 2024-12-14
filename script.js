$(document).ready(function () {
    checkUser()
    modifyCSS(getUser());
    // activeNavLink();
    bookRegistrationSteps();
    handleBookViewDetails();
    handleBookBorrow();
    /// FOR the footer 
    $("#current-year").text(new Date().getFullYear());

    /// FOR User Role Session
    $("#user-student").click(function(){
        sessionStorage.setItem("username", "student");
      });
    $("#user-librarian").click(function(){
        sessionStorage.setItem("username", "librarian");
      });
    $("#user-admin").click(function(){
        sessionStorage.setItem("username", "admin");
      });
});

function handleBookViewDetails(){
  $(".book-view-details").click(function(){
    window.location.href = "book-info.html";
  });
}

function handleBookBorrow(){
  $(".book-borrow").click(function(){
    window.location.href = "book-borrow.html";
  });
}

function getUser(){
  return sessionStorage.getItem("username");
}

function removeUser(){
  sessionStorage.removeItem("username");
}

function checkUser(){
    var currentHTMLName = document.location.href.match(/[^\/]+$/)[0];
    if (currentHTMLName == "index.html" || currentHTMLName == "forgot-password.html" || currentHTMLName == "reset-password.html"){
        return;
    }
    var session = getUser();
    if (session != "student" && session != "librarian" && session != "admin"){
        window.location.href = "index.html";
    }
}

function modifyCSS(user){
    if (user == "admin") {
      $("nav").css({
        "background": "linear-gradient(318deg, rgba(234,182,77,1) 0%, rgba(233,200,78,1) 100%)"
      });
      $("footer").css({
          "background": "linear-gradient(318deg, rgba(234,182,77,1) 0%, rgba(233,200,78,1) 100%)"
      });
      $(".bg-gradient-green").css({
          "background": "linear-gradient(318deg, rgba(234,182,77,1) 0%, rgba(233,200,78,1) 100%)"
      });
    } else if (user == "librarian"){
      $("nav").css({
        "background": "linear-gradient(318deg, rgba(61,38,42,1) 0%, rgba(89,54,60,1) 100%)"
      });
      $("footer").css({
          "background": "linear-gradient(318deg, rgba(61,38,42,1) 0%, rgba(89,54,60,1) 100%)"
      });
      $(".bg-gradient-green").css({
          "background": "linear-gradient(318deg, rgba(61,38,42,1) 0%, rgba(89,54,60,1) 100%)"
      });
    
    } else {
      $("nav").css({
        "background": "linear-gradient(318deg, rgba(18,124,86,1) 0%, rgba(31,183,129,1) 100%)"
      });
      $("footer").css({
          "background": "linear-gradient(318deg, rgba(18,124,86,1) 0%, rgba(31,183,129,1) 100%)"
      });
      $(".bg-gradient-green").css({
          "background": "linear-gradient(318deg, rgba(18,124,86,1) 0%, rgba(31,183,129,1) 100%)"
      });
    
    }
}

// function activeNavLink() {
//   var currentUrl = window.location.href;
//   $('.nav-link').each(function() {
//       if (this.href === currentUrl) {
//           $(this).addClass('active border-top border-white border-3');
//       } else {
//           $(this).removeClass('active border-top border-white border-3');
//       }
//   });

  
// }
function bookRegistrationSteps(){
  let currentStep = 1;

  function updateSteps() {
      $('.form-step').removeClass('active').eq(currentStep - 1).addClass('active');
      $('.progress-bar-step .step').removeClass('active').eq(currentStep - 1).addClass('active');
  }

  $('.next-btn').click(function () {
      if (currentStep < 3) {
          currentStep++;
          updateSteps();
      }
  });

  $('.prev-btn').click(function () {
      if (currentStep > 1) {
          currentStep--;
          updateSteps();
      }
  });

  $('#bookRegistrationForm').submit(function (e) {
      e.preventDefault();
      alert('Form submitted successfully!');
  });
}



$(document).ready(function () {
  const userRole = sessionStorage.getItem("username");
  const finesData = [
      { book: "Book A", user: "Student 1", dueDate: "2024-01-01", fine: 50, status: "Unpaid" },
      { book: "Book B", user: "Student 2", dueDate: "2024-02-01", fine: 100, status: "Unpaid" }
  ];

  function showFines() {
      const studentView = $("#student-view");
      const librarianView = $("#librarian-view");
      const paymentSection = $("#payment-section");

      if (userRole === "student") {
          studentView.removeClass("d-none");
          const studentFines = finesData.filter(f => f.user === "Student 1"); // Replace with actual user filtering
          studentFines.forEach(f => {
              $("#student-fines").append(
                  `<tr>
                      <td>${f.book}</td>
                      <td>${f.dueDate}</td>
                      <td>${f.fine}</td>
                      <td>${f.status}</td>
                  </tr>`
              );
          });
      } else if (userRole === "librarian") {
          librarianView.removeClass("d-none");
          finesData.forEach(f => {
              $("#librarian-fines").append(
                  `<tr>
                      <td>${f.book}</td>
                      <td>${f.user}</td>
                      <td>${f.dueDate}</td>
                      <td>${f.fine}</td>
                      <td>${f.status}</td>
                      <td><button class='btn btn-primary btn-sm email-fine'>Email</button></td>
                  </tr>`
              );
          });
      }

      if (userRole === "student") {
          const totalFine = finesData.filter(f => f.user === "Student 1" && f.status === "Unpaid").reduce((sum, f) => sum + f.fine, 0);
          if (totalFine > 0) {
              paymentSection.removeClass("d-none");
              $("#total-fine").text(totalFine);
          }
      }
  }

  $("#pay-fine").click(function () {
      alert("Fine paid successfully!");
      finesData.forEach(f => {
          if (f.user === "Student 1" && f.status === "Unpaid") {
              f.status = "Paid";
          }
      });
      location.reload();
  });

  $(document).on("click", ".email-fine", function () {
      alert("Email sent to the student!");
  });

  showFines();
});

$(document).ready(function () {
  const userRole = sessionStorage.getItem("username");

  const inventoryData = [
      { resource: "Book A", total: 50, available: 30, borrowed: 20 },
      { resource: "Book B", total: 40, available: 25, borrowed: 15 },
      { resource: "Magazine C", total: 20, available: 10, borrowed: 10 }
  ];

  const usageData = [
      { resource: "Book A", borrowCount: 120 },
      { resource: "Book B", borrowCount: 85 },
      { resource: "Magazine C", borrowCount: 50 }
  ];

  const fineData = [
      { user: "Student 1", book: "Book A", fine: 50, status: "Paid", date: "2024-01-15" },
      { user: "Student 2", book: "Book B", fine: 100, status: "Unpaid", date: "N/A" }
  ];

  function renderInventory() {
      inventoryData.forEach(item => {
          $("#inventory-data").append(`
              <tr>
                  <td>${item.resource}</td>
                  <td>${item.total}</td>
                  <td>${item.available}</td>
                  <td>${item.borrowed}</td>
              </tr>
          `);
      });
  }

  function renderUsageAnalytics() {
      usageData.forEach(item => {
          $("#usage-stats").append(`
              <p>${item.resource} has been borrowed ${item.borrowCount} times.</p>
          `);
      });
  }

  function renderFineReports() {
      if (userRole === "student") {
          $("#student-view-fines").removeClass("d-none");
          const studentFines = fineData.filter(f => f.user === "Student 1"); // Replace with actual user data
          studentFines.forEach(f => {
              $("#student-fine-stats").append(`
                  <tr>
                      <td>${f.book}</td>
                      <td>${f.fine}</td>
                      <td>${f.status}</td>
                  </tr>
              `);
          });
      } else if (userRole === "librarian") {
          $("#librarian-view-fines").removeClass("d-none");
          fineData.forEach(f => {
              $("#librarian-fine-stats").append(`
                  <tr>
                      <td>${f.user}</td>
                      <td>${f.book}</td>
                      <td>${f.fine}</td>
                      <td>${f.status}</td>
                      <td>${f.date}</td>
                  </tr>
              `);
          });
      }
  }

  function initReports() {
      renderInventory();
      renderUsageAnalytics();
      renderFineReports();
  }

  initReports();
});






$(document).ready(function () {
  function generateCitation(data) {
      const {
          title = '',
          contributors = '',
          year = '',
          month = '',
          day = '',
          edition = '',
          volume = '',
          medium = '',
          publisher = '',
          doi = '',
          annotation = '',
          format = '',
      } = data;

      let citation = '';
      const date = `${month}${day ? ' ' + day : ''}${year ? ', ' + year : ''}`.trim();

      // Generate citation based on the selected format
      if (format === 'APA') {
          citation = `${contributors}. (${date}). *${title}*. ${edition ? edition + ', ' : ''}${volume ? 'Vol. ' + volume + ', ' : ''}${publisher}${medium ? ` [${medium}]` : ''}. ${doi ? `https://doi.org/${doi}` : ''}`;
      } else if (format === 'MLA') {
          citation = `${contributors}. "${title}". ${edition ? edition + ', ' : ''}${volume ? 'Vol. ' + volume + ', ' : ''}${publisher}, ${date}.${medium ? ` [${medium}]` : ''}`;
      } else if (format === 'Chicago') {
          citation = `${contributors}. "${title}". ${edition ? edition + ', ' : ''}${volume ? 'Vol. ' + volume + ', ' : ''}${publisher}, ${date}.${medium ? ` (${medium})` : ''} ${doi ? `DOI: ${doi}` : ''}`;
      } else {
          citation = 'Unsupported format selected.';
      }

      if (annotation) citation += `\nAnnotation: ${annotation}`;
      return citation || 'Invalid citation data.';
  }

  // Form submission handler
  $('#citationForm').submit(function (e) {
      e.preventDefault();

      // Collect form data
      const citationData = {
          title: $('#citationTitle').val()?.trim(),
          contributors: $('#citationContributors').val()?.trim(),
          year: $('#citationYear').val()?.trim(),
          month: $('#citationMonth').val(),
          day: $('#citationDay').val()?.trim(),
          edition: $('#citationEdition').val()?.trim(),
          volume: $('#citationVolume').val()?.trim(),
          medium: $('#citationMedium').val(),
          publisher: $('#citationPublisher').val()?.trim(),
          doi: $('#citationDOI').val()?.trim(),
          annotation: $('#citationAnnotation').val()?.trim(),
          format: $('#citationFormat').val(),
      };

      // Generate citation
      const citation = generateCitation(citationData);
      $('#citationOutput').text(citation);
  });

  // Copy citation to clipboard
  $('#copyCitation').click(function () {
      const citation = $('#citationOutput').text();
      if (citation) {
          navigator.clipboard.writeText(citation)
              .then(() => alert('Citation copied to clipboard!'))
              .catch(() => alert('Failed to copy citation!'));
      } else {
          alert('No citation to copy!');
      }
  });

  // Save citation as a text file
  $('#saveCitation').click(function () {
      const citation = $('#citationOutput').text();
      if (citation) {
          const blob = new Blob([citation], { type: 'text/plain' });
          const link = document.createElement('a');
          link.href = URL.createObjectURL(blob);
          link.download = 'citation.txt';
          link.click();
      } else {
          alert('No citation to save!');
      }
  });
});
