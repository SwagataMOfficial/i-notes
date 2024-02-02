<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Note;

class NotesController extends Controller {
    public function addNote(Request $request) {
        $result = ["success" => false];
        $notes = new Note;
        if (!is_null($request->authtoken)) {
            if (!is_null($request->note)) {
                $notes->authtoken = $request->authtoken;
                $notes->note = $request->note;
                $notes->save();
                $result['success'] = true;
                $result['successMessage'] = "Note Added Successfully";
            }
            else {
                $result['success'] = false;
                $result['errorMessage'] = "Note cannot be empty";
            }
        }
        else {
            $result['success'] = false;
            $result['errorMessage'] = "Authtoken is invalid";
        }
        return $result;
    }

    public function getNote(Request $request) {
        $notes = new Note;
        if (!is_null($request->authtoken)) {
            $note = Note::where('authtoken', '=', $request->authtoken)->get()->toArray();
            return $note;
        }
        else {
            return null;
        }
    }

    public function deleteNote(Request $request) {
        $note = Note::where('sl_no', '=', $request->noteId)->Where('authtoken', '=', $request->authtoken)->get();
        if (count($note) != 0) {
            Note::where('sl_no', '=', $request->noteId)->Where('authtoken', '=', $request->authtoken)->delete();
            return [
                "success" => true,
                "successMessage" => "Note Deleted Successfully"
            ];
        }
        else {
            return [
                "success" => false,
                "errorMessage" => "Note Not Found"
            ];
        }
    }

    public function updateNote(Request $request) {
        $result = ["success" => false];
        $notes = Note::find($request->noteId);
        $existingNote = Note::where('sl_no', '=', $request->noteId)->Where('authtoken', '=', $request->authtoken)->get();
        if (!is_null($request->authtoken)) {
            if (count($existingNote) != 0) {
                // TODO: add functionality to update the edited note
                $notes->authtoken = $request->authtoken;
                $notes->note = $request->note;
                $notes->save();
                $result['success'] = true;
                $result['successMessage'] = "Note Edited Successfully";
            }
            else {
                $result["success"] = false;
                $result["errorMessage"] = "Note Not Found";
            }
        }
        else {
            $result["success"] = false;
            $result["errorMessage"] = "Authtoken Is Invalid";
        }

        return $result;
    }
}
