calendar-container {
  padding: 40px;
}

.calendar-title {
  color: #00853E;
  margin-bottom: 30px;
}

.calendar-grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 10px;
}

.calendar-day {
  background: white;
  min-height: 120px;
  border-radius: 10px;
  padding: 12px;
  box-shadow: 0 3px 10px rgba(0, 0, 0, .08);
}

.calendar-day:hover {
  background: #eef9f2;
}

.calendar-event {
  margin-top: 10px;
  background: #00853E;
  color: white;
  border-radius: 5px;
  padding: 4px 8px;
  font-size: .85rem;
}

