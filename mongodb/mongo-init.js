while (true) {
  if (rs.initiate().ok || rs.status().ok) break;
  sleep(1000);
}
