import { AddOutlined } from "@mui/icons-material";
import { Button, IconButton, Typography } from "@mui/material";
import { JournalLayout } from "../layout/JournalLayout";
import { NoteView, NothingSelectedView } from "../views";

export const JournalPage = () => {
  return (
    <JournalLayout>
      {/* <Typography>
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ipsam iusto
        sunt laudantium corrupti. Atque dolore beatae dolorum error. Nihil
        praesentium atque maxime. Sapiente fuga quibusdam blanditiis delectus,
        laboriosam omnis a!
      </Typography> */}
      <NothingSelectedView />
      {/* <NoteView/> */}
      {/* Nothing selected */}
      <IconButton
        size="large"
        sx={{
          color: "white",
          backgroundColor: "error.main",
          ":hover": { backgroundColor: "error.main", opacity: 0.9 },
          position: "fixed",
          right: 50,
          bottom: 50,
        }}
      >
        <AddOutlined sx={{ fontSize: 30 }} />
      </IconButton>
    </JournalLayout>
  );
};
