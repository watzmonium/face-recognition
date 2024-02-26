const faceRequestQueries = {
  createFaceRequest: `INSERT INTO requests (created_at, status, file_name, file_id) 
                      VALUES (now(), 'PENDING', $1, $2);`,

  getAllRequests:    `SELECT * FROM requests;`,

  getSingleRequest:  `SELECT * FROM requests
                      WHERE file_id = $1;`,
                      
  deleteRequest:     `DELETE FROM requests
                      WHERE file_id = $1`,
  
  updateStatus:      `UPDATE requests
                      SET status = 'COMPLETED'
                      WHERE file_id = $1`,
                      
  updateFaceCount:   `UPDATE requests
                      SET face_count = $1, status = 'COMPLETED'
                      WHERE file_id = $2
                      RETURNING *`,
};

export default faceRequestQueries;
