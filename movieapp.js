$(document).ready(function() {
  const movieEntries = []; 

  $("#movieForm").submit(function(event) {
    event.preventDefault();
    const title = $("#title").val();
    const rating = $("#rating").val();

    
    if (title.length < 2 || isNaN(rating) || rating < 0 || rating > 10) {
      alert("Please enter a valid title (at least 2 characters) and a valid rating (between 0 and 10).");
      return;
    }

    const movieEntry = { title: title, rating: parseFloat(rating) };
    movieEntries.push(movieEntry);

    
    $("#title").val("");
    $("#rating").val("");

    updateMovieList();
  });

  function updateMovieList() {
  
    $("#movieList").empty();

    const sortBy = $("#sort").val();
    let sortedEntries = movieEntries.slice(); 
    if (sortBy === "titleAsc") {
      sortedEntries.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortBy === "titleDesc") {
      sortedEntries.sort((a, b) => b.title.localeCompare(a.title));
    } else if (sortBy === "ratingAsc") {
      sortedEntries.sort((a, b) => a.rating - b.rating);
    } else if (sortBy === "ratingDesc") {
      sortedEntries.sort((a, b) => b.rating - a.rating);
    }

    sortedEntries.forEach(entry => {
      const movieEntryRow = $("<tr>");
      const movieTitle = $("<td>").text(entry.title);
      const movieRating = $("<td>").text(entry.rating.toFixed(1));
      const removeButton = $("<button>").text("Remove").addClass("remove-button");

      movieEntryRow.append(movieTitle, movieRating, $("<td>").append(removeButton));
      $("#movieList").append(movieEntryRow);
    });
  }

  $(document).on("click", ".remove-button", function() {
    const entryIndex = $(this).closest("tr").index();
    movieEntries.splice(entryIndex, 1); 
    updateMovieList(); 
  });

 
  $("#sort").change(function() {
    updateMovieList();
  });
});
    
    
    
    
    
    
    
    
    
    
    