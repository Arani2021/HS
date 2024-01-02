// Add subject input fields dynamically
const subjectMarksContainer = document.querySelector('.subject-marks');
const subjects = ['Subject 1', 'Subject 2', 'Subject 3', 'Subject4', 'Subject5']; // Replace with actual subjects
subjects.forEach((subject, index) => {
  const label = document.createElement('label');
  label.textContent = `${subject}:`;
  const input = document.createElement('input');
  input.type = 'number';
  input.id = `subject${index + 1}`;
  input.required = true;
  subjectMarksContainer.appendChild(label);
  subjectMarksContainer.appendChild(input);
});

// Handle form submission
const marksheetForm = document.getElementById('marksheet-form');
marksheetForm.addEventListener('submit', (event) => {
  event.preventDefault(); // Prevent default form submission

  // Get user inputs
  const name = document.getElementById('name').value;
  const rollNo = document.getElementById('rollNo').value;
  const marks = [];
  for (let i = 1; i <= 5; i++) {
    const mark = parseFloat(document.getElementById(`subject${i}`).value);
    if (isNaN(mark) || mark < 0 || mark > 100) {
      alert('Please enter valid marks between 0 and 100.');
      return; // Stop further processing if invalid marks
    }
    marks.push(mark);
  }

  // Calculate total, percentage, grade, and scholarship eligibility
  const totalMarks = 500;
  const obtainedMarks = marks.reduce((sum, mark) => sum + mark, 0);
  const percentage = (obtainedMarks / totalMarks) * 100;
  let grade;
  if (percentage >= 90) {
    grade = 'A';
  } else if (percentage >= 80) {
    grade = 'B';
    
  } 
  else if(percentage >= 70) {
    grade = 'C';
  } else if(percentage >= 60) {
    grade = 'D';
  } else if(percentage >= 50) {
    grade = 'E';
  } else {
    grade = 'F';
  }
  
  const isScholarshipEligible = percentage >= 60;

  // Display marksheet details
  const marksheetSection = document.querySelector('.marksheet-section');
  marksheetSection.innerHTML = `
    <h2>Marksheet</h2>
    <table>
      <thead>
        <tr>
          <th>Subject</th>
          <th>Marks</th>
        </tr>
      </thead>
      <tbody>
      </tbody>
      <tfoot>
        <tr>
          <td>Total Marks:</td>
          <td>${totalMarks}</td>
        </tr>
        <tr>
          <td>Obtained Marks:</td>
          <td>${obtainedMarks}</td>
        </tr>
        <tr>
          <td>Percentage:</td>
          <td>${percentage.toFixed(2)}%</td>
        </tr>
        <tr>
          <td>Grade:</td>
          <td>${grade}</td>
        </tr>
        <tr>
          <td>Scholarship Eligible:</td>
          <td>${isScholarshipEligible ? 'Yes' : 'No'}</td>
        </tr>
      </tfoot>
    </table>
  `;

  // Add subject marks to table rows
  subjects.forEach((subject, index) => {
    const row = document.createElement('tr');
    const subjectCell = document.createElement('td');
    subjectCell.textContent = subject;
    const marksCell = document.createElement('td');
    marksCell.textContent = marks[index];
    row.appendChild(subjectCell);
    row.appendChild(marksCell);
    table.querySelector('tbody').appendChild(row);
  });
});
