export async function getWatchlists(token: string) {
  try {
    const res = await fetch("/api/watchlists", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}, ${data.message}`);
    }

    return data;
  } catch (error) {
    console.error("Error fetching watchlists:", error);
  }
}

export async function addMovieToWatchist(token: string, movieId: number) {
  try {
    const res = await fetch("/api/movies/watchlist", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ movieId }),
    });

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching watchlists:", error);
  }
}

export async function removeMovieFromWatchist(token: string, movieId: number) {
  try {
    const res = await fetch("/api/movies/watchlist", {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ movieId }),
    });

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching watchlists:", error);
  }
}

export async function addSerieToWatchist(token: string, seriesId: number) {
  try {
    const res = await fetch("/api/series/watchlist", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ seriesId }),
    });    

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching watchlists:", error);
  }
}

export async function removeSerieFromWatchist(token: string, seriesId: number) {
  try {
    const res = await fetch("/api/series/watchlist", {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ seriesId }),
    });

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching watchlists:", error);
  }
}

export async function getStatistics(token: string) {
  const res = await fetch("/api/watchlists/stats", {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch statistics");
  }

  return res.json();
}
